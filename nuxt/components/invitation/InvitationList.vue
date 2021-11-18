<template>
  <Loader
    v-if="($apollo.loading && !allInvitations) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <ScrollContainer
      v-if="allInvitations && event"
      :has-next-page="allInvitations.pageInfo.hasNextPage"
      @loadMore="loadMore"
    >
      <table class="divide-y divide-gray-200">
        <thead class="sticky top-0 z-10">
          <tr>
            <th scope="col">
              {{ $t('contact') }}
            </th>
            <th class="hidden lg:table-cell" scope="col">
              {{ $t('invitationCode') }}
            </th>
            <th />
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="invitation in allInvitations.nodes"
            :key="invitation.uuid"
            class="px-6 py-4"
            :class="{
              'animate-pulse': pending.deletions.includes(invitation.uuid),
            }"
          >
            <td>
              <ContactPreview
                :contact="invitation.contactByContactId"
                :feedback="invitation.feedback"
              />
            </td>
            <td class="hidden lg:table-cell">
              {{ invitation.uuid }}
            </td>
            <td class="flex items-center justify-evenly ml-4 text-gray-700">
              <ButtonTableInteraction
                :aria-label="$t('invitationView')"
                :icon-id="['fas', 'eye']"
                is-title-show
                @click="
                  $router.push({
                    path: localePath(
                      `/event/${event.authorUsername}/${event.slug}`
                    ),
                    query: { ic: invitation.uuid },
                  })
                "
              />
              <ButtonTableInteraction
                :aria-label="
                  invitation.contactByContactId.accountUsername ||
                  invitation.contactByContactId.emailAddress
                    ? $t('invitationSend')
                    : $t('disabledReasonEmailAddressNone')
                "
                :disabled="
                  (!invitation.contactByContactId.accountUsername &&
                    !invitation.contactByContactId.emailAddress) ||
                  pending.sends.includes(invitation.uuid)
                "
                :icon-id="['fas', 'paper-plane']"
                is-title-show
                @click="send(invitation)"
              />
              <ButtonTableInteraction
                :aria-label="$t('invitationDelete')"
                :disabled="pending.deletions.includes(invitation.uuid)"
                :icon-id="['fas', 'trash']"
                is-title-show
                @click="delete_(invitation.uuid)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </ScrollContainer>
    <br />
    <ButtonColored
      :aria-label="$t('invitationAdd')"
      :disabled="
        event.inviteeCountMaximum
          ? allInvitations.totalCount >= event.inviteeCountMaximum
          : false
      "
      :icon-id="['fas', 'plus']"
      @click="add()"
    >
      {{ $t('invitationAdd') }}
    </ButtonColored>
    <p class="text-center text-gray-500">
      {{
        $t('invitationsUsed', {
          amountCurrent: allInvitations.totalCount,
          amountMaximum: event.inviteeCountMaximum || '∞',
        })
      }}
    </p>
    <Modal id="ModalInvitation">
      <FormInvitation :event="event" @submitSuccess="onSubmitSuccess" />
      <template slot="header">
        {{ $t('invitationAdd') }}
      </template>
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import INVITATION_DELETE_MUTATION from '~/gql/mutation/invitation/invitationDelete.gql'
import INVITE_MUTATION from '~/gql/mutation/invitation/invite.gql'
import INVITATIONS_ALL_QUERY from '~/gql/query/invitation/invitationsAll.gql'
import { Event as MaevsiEvent } from '~/types/event'

const consola = require('consola')

export default defineComponent({
  apollo: {
    allInvitations(): any {
      return {
        query: INVITATIONS_ALL_QUERY,
        variables: {
          eventId: +this.event.id,
          first: this.$global.ITEMS_PER_PAGE_LARGE,
          offset: null,
        },
        error(error: any, _vm: any, _key: any, _type: any, _options: any) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  props: {
    event: {
      required: true,
      type: Object as PropType<MaevsiEvent>,
    },
  },
  data() {
    return {
      allInvitations: undefined as any,
      graphqlError: undefined as any,
      pending: {
        deletions: [] as string[],
        edits: [] as string[],
        sends: [] as string[],
      },
    }
  },
  methods: {
    add() {
      this.$store.commit('modalAdd', { id: 'ModalInvitation' })
    },
    delete_(uuid: string) {
      this.pending.deletions.push(uuid)
      this.graphqlError = undefined
      this.$apollo
        .mutate({
          mutation: INVITATION_DELETE_MUTATION,
          variables: {
            uuid,
          },
        })
        .then((_value) => {
          this.$apollo.queries.allInvitations &&
            this.$apollo.queries.allInvitations.refetch()
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
        .finally(() => {
          this.pending.deletions.splice(this.pending.deletions.indexOf(uuid), 1)
        })
    },
    send(invitation: any) {
      this.pending.sends.push(invitation.uuid)
      this.graphqlError = undefined
      this.$apollo
        .mutate({
          mutation: INVITE_MUTATION,
          variables: {
            invitationId: invitation.id,
            language: this.$i18n.locale,
          },
        })
        .then((_value) => {
          this.$swal({
            icon: 'success',
            text: this.$t('sendSuccess') as string,
            title: this.$t('sent'),
          })
          this.$apollo.queries.allInvitations &&
            this.$apollo.queries.allInvitations.refetch()
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
        .finally(() => {
          this.pending.sends.splice(
            this.pending.sends.indexOf(invitation.uuid),
            1
          )
        })
    },
    onSubmitSuccess() {
      this.$store.commit('modalRemove', 'ModalInvitation')
      this.$apollo.queries.allInvitations.refetch()
    },
    loadMore() {
      this.$global.loadMore(this.$apollo, 'allInvitations', this.allInvitations)
    },
  },
})
</script>

<i18n lang="yml">
de:
  contact: Kontakt
  disabledReasonEmailAddressNone: Diesem Kontakt fehlt eine E-Mail-Adresse.
  invitationAdd: Einladung hinzufügen
  invitationCode: Einladungscode
  invitationDelete: Einladung löschen
  invitationSend: Einladung versenden
  invitationView: Einladung anzeigen
  invitationsUsed: 'Einladungen benutzt: {amountCurrent} / {amountMaximum}'
  sendSuccess: Einladung erfolgreich angefordert.
  sent: Gesendet!
en:
  contact: Contact
  disabledReasonEmailAddressNone: This contact is missing an email address.
  invitationAdd: Add invitation
  invitationCode: Invitation code
  invitationDelete: Delete invitation
  invitationSend: Send invitation
  invitationView: View invitation
  invitationsUsed: 'Invitations used: {amountCurrent} / {amountMaximum}'
  sendSuccess: Invitation requested successfully.
  sent: Sent!
</i18n>
