<template>
  <Loader
    v-if="($apollo.loading && !allInvitations) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <div
      v-if="allInvitations"
      class="
        bg-white
        shadow
        border-b border-gray-200
        rounded-lg
        overflow-auto
        text-gray-900
      "
      :class="{
        'rounded-b-none': allInvitations.totalCount < event.inviteeCountMaximum,
      }"
    >
      <table class="divide-y divide-gray-200">
        <thead>
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
                  invitation.contactByContactId.emailAddress
                    ? $t('invitationSend')
                    : $t('disabledReasonEmailAddressNone')
                "
                :disabled="
                  !invitation.contactByContactId.emailAddress ||
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
          <tr>
            <td colspan="3">
              <Button
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
              </Button>
              <p class="text-center text-gray-500">
                {{
                  $t('invitationsUsed', {
                    amountCurrent: allInvitations.totalCount,
                    amountMaximum: event.inviteeCountMaximum || '∞',
                  })
                }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
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
import { Event } from '~/types/event'

const consola = require('consola')

export default defineComponent({
  apollo: {
    allInvitations(): any {
      return {
        query: INVITATIONS_ALL_QUERY,
        variables: {
          eventId: +this.event.id,
        },
        update: (data: any) => data.allInvitations,
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
      type: Object as PropType<Event>,
    },
  },
  data() {
    return {
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
          this.$store.commit('modalAdd', {
            contentBody: this.$t('sendSuccess', {
              emailAddress: invitation.contactByContactId.emailAddress,
            }),
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
  sendSuccess: Einladung an {emailAddress} erfolgreich angefordert.
en:
  contact: Contact
  disabledReasonEmailAddressNone: This contact is missing an email address.
  invitationAdd: Add invitation
  invitationCode: Invitation code
  invitationDelete: Delete invitation
  invitationSend: Send invitation
  invitationView: View invitation
  invitationsUsed: 'Invitations used: {amountCurrent} / {amountMaximum}'
  sendSuccess: Invitation to {emailAddress} requested successfully.
</i18n>
