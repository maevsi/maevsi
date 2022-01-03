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
      <table class="border border-neutral-300 dark:border-neutral-600">
        <thead
          class="bg-background-bright dark:bg-background-dark sticky top-0 z-10"
        >
          <tr>
            <th scope="col">
              {{ $t('contact') }}
            </th>
            <th class="hidden xl:table-cell" scope="col">
              {{ $t('invitationCode') }}
            </th>
            <th />
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-300 dark:divide-neutral-600">
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
            <td class="hidden xl:table-cell">
              {{ invitation.uuid }}
            </td>
            <td
              class="flex items-center justify-evenly ml-4 text-text-dark dark:text-text-bright"
            >
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
    <p class="text-center text-gray-500 dark:text-gray-400">
      {{
        $t('invitationsUsed', {
          amountCurrent: allInvitations.totalCount,
          amountMaximum: event.inviteeCountMaximum || '∞',
        })
      }}
    </p>
    <!-- https://github.com/reg-viz/storycap/issues/501 -->
    <PieChart v-if="!$config.STORYBOOK" :chart-data="data" />
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
import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  PieController,
  Title,
  Tooltip,
} from 'chart.js'
import consola from 'consola'
import { PieChart } from 'vue-chart-3'

import { defineComponent, PropType } from '#app'
import INVITATION_DELETE_MUTATION from '~/gql/mutation/invitation/invitationDelete.gql'
import INVITE_MUTATION from '~/gql/mutation/invitation/invite.gql'
import INVITATIONS_ALL_QUERY from '~/gql/query/invitation/invitationsAll.gql'
import { Event as MaevsiEvent } from '~/types/event'

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PieController,
  Title,
  Tooltip,
  Legend
)

export default defineComponent({
  components: {
    PieChart,
  },
  apollo: {
    allInvitations(): any {
      return {
        query: INVITATIONS_ALL_QUERY,
        variables: {
          eventId: +this.event.id,
          first: this.$util.ITEMS_PER_PAGE_LARGE,
          offset: null,
        },
        result: (data: any) => {
          const invitations = this.$util.getNested(
            data,
            'data',
            'allInvitations',
            'nodes'
          )
          const datasetData = [0, 0, 0]

          for (const invitation of invitations) {
            switch (invitation.feedback) {
              case 'ACCEPTED':
                datasetData[0] += 1
                break
              case 'CANCELED':
                datasetData[1] = datasetData[1] + 1
                break
              case null:
                datasetData[2] = datasetData[2] + 1
                break
              default:
                consola.error('Unexpected invitation type.')
            }
          }

          this.data = {
            labels: [
              this.$t('accepted'),
              this.$t('canceled'),
              this.$t('noFeedback'),
            ],
            datasets: [
              {
                data: datasetData,
                backgroundColor: ['#00FF00', '#FF0000', '#888888'],
              },
            ],
          }
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
      data: {} as any,
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
    loadMore() {
      this.$util.loadMore(this.$apollo, 'allInvitations', this.allInvitations)
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
  },
})
</script>

<i18n lang="yml">
de:
  accepted: akzeptiert
  canceled: abgelehnt
  contact: Kontakt
  disabledReasonEmailAddressNone: Diesem Kontakt fehlt eine E-Mail-Adresse.
  invitationAdd: Einladung hinzufügen
  invitationCode: Einladungscode
  invitationDelete: Einladung löschen
  invitationSend: Einladung versenden
  invitationView: Einladung anzeigen
  invitationsUsed: 'Einladungen benutzt: {amountCurrent} / {amountMaximum}'
  noFeedback: kein Feedback
  sendSuccess: Einladung erfolgreich angefordert.
  sent: Gesendet!
en:
  accepted: accepted
  canceled: canceled
  contact: Contact
  disabledReasonEmailAddressNone: This contact is missing an email address.
  invitationAdd: Add invitation
  invitationCode: Invitation code
  invitationDelete: Delete invitation
  invitationSend: Send invitation
  invitationView: View invitation
  invitationsUsed: 'Invitations used: {amountCurrent} / {amountMaximum}'
  noFeedback: no feedback
  sendSuccess: Invitation requested successfully.
  sent: Sent!
</i18n>
