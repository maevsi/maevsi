<template>
  <Loader
    v-if="($apollo.loading && !allInvitations) || graphqlError"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
  />
  <div v-else class="flex flex-col gap-4">
    <ScrollContainer
      v-if="allInvitations && event"
      :has-next-page="allInvitations.pageInfo.hasNextPage"
      @loadMore="loadMore"
    >
      <table class="border border-neutral-300 dark:border-neutral-600">
        <thead
          class="sticky top-0 z-10 bg-background-bright dark:bg-background-dark"
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
            :class="{
              'animate-pulse': pending.deletions.includes(invitation.uuid),
            }"
          >
            <td class="max-w-0">
              <ContactPreview
                :contact="invitation.contactByContactId"
                :feedback="invitation.feedback"
              />
            </td>
            <td class="hidden max-w-0 xl:table-cell">
              {{ invitation.uuid }}
            </td>
            <td class="max-w-0">
              <div
                class="flex items-center justify-evenly gap-4 text-text-dark dark:text-text-bright"
              >
                <DropDown>
                  <ButtonTableInteraction
                    :aria-label="$t('globalShowMore')"
                    is-title-show
                  >
                    <IconDotsVertical />
                  </ButtonTableInteraction>
                  <template slot="content">
                    <ButtonTableInteraction
                      :aria-label="$t('invitationLink')"
                      is-title-show
                      @click="copyLink(event, invitation)"
                    >
                      <IconLink />
                    </ButtonTableInteraction>
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
                      is-title-show
                      @click="send(invitation)"
                    >
                      <IconPaperPlane />
                    </ButtonTableInteraction>
                    <ButtonTableInteraction
                      :aria-label="$t('invitationView')"
                      is-title-show
                      @click="
                        $router.push({
                          path: localePath(
                            `/event/${event.authorUsername}/${event.slug}`
                          ),
                          query: { ic: invitation.uuid },
                        })
                      "
                    >
                      <IconEye />
                    </ButtonTableInteraction>
                    <ButtonTableInteraction
                      :aria-label="$t('invitationDelete')"
                      :disabled="pending.deletions.includes(invitation.uuid)"
                      is-title-show
                      @click="delete_(invitation.uuid)"
                    >
                      <IconTrash />
                    </ButtonTableInteraction>
                  </template>
                </DropDown>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </ScrollContainer>
    <div class="flex flex-col gap-1">
      <ButtonColored
        :aria-label="$t('invitationAdd')"
        :disabled="
          event.inviteeCountMaximum
            ? allInvitations.totalCount >= event.inviteeCountMaximum
            : false
        "
        @click="add()"
      >
        {{ $t('invitationAdd') }}
        <template slot="prefix">
          <IconPlus />
        </template>
      </ButtonColored>
      <p class="text-center text-gray-500 dark:text-gray-400">
        {{
          $t('invitationsUsed', {
            amountCurrent: allInvitations.totalCount,
            amountMaximum: event.inviteeCountMaximum || '∞',
          })
        }}
      </p>
    </div>
    <div class="m-auto w-1/4">
      <!-- https://github.com/reg-viz/storycap/issues/501 -->
      <Pie
        v-if="!$config.STORYBOOK"
        :chart-data="data"
        :chart-options="options"
      />
    </div>
    <Modal id="ModalInvitation">
      <FormInvitation :event="event" @submitSuccess="onSubmitSuccess" />
      <template slot="header">
        {{ $t('contactSelect') }}
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
import { Pie } from 'vue-chartjs/legacy'

import { defineComponent, PropType } from '#app'
import INVITATION_DELETE_MUTATION from '~/gql/mutation/invitation/invitationDelete.gql'
import INVITE_MUTATION from '~/gql/mutation/invitation/invite.gql'
import INVITATIONS_ALL_QUERY from '~/gql/query/invitation/invitationsAll.gql'
import { Event as MaevsiEvent } from '~/types/event'
import { Invitation } from '~/types/invitation'

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
    Pie,
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
      graphqlError: undefined as Error | undefined,
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                fontFamily:
                  'Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                size: 16,
              },
            },
          },
        },
      },
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
    copyLink(event: MaevsiEvent, invitation: Invitation): void {
      if (!process.browser) return

      this.$copyText(
        `${window.location.origin}${this.localePath(
          `/event/${event.authorUsername}/${event.slug}`
        )}?ic=${invitation.uuid}`
      ).then(() => {
        this.$swal({
          icon: 'success',
          text: this.$t('copySuccess') as string,
          title: this.$t('copied'),
        })
      })
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
  contactSelect: Kontakt auswählen
  copied: Kopiert
  copySuccess: Der Einladungslink wurde in die Zwischenablage kopiert.
  disabledReasonEmailAddressNone: Diesem Kontakt fehlt eine E-Mail-Adresse.
  invitationAdd: Einladung hinzufügen
  invitationCode: Einladungscode
  invitationDelete: Einladung löschen
  invitationLink: Einladungslink kopieren
  invitationSend: Einladung versenden
  invitationView: Einladung anzeigen
  invitationsUsed: 'Einladungen benutzt: {amountCurrent} / {amountMaximum}'
  noFeedback: kein Feedback
  postgresP0002: Die Einladung konnte nicht versandt werden! Möglicherweise hast du aktuell keinen Zugriff auf die notwendigen Daten. Versuche die Seite neu zu laden.
  sendSuccess: Einladung erfolgreich angefordert.
  sent: Gesendet!
en:
  accepted: accepted
  canceled: canceled
  contact: Contact
  contactSelect: Select Contact
  copied: Copied
  copySuccess: The invitation link was copied to the clipboard.
  disabledReasonEmailAddressNone: This contact is missing an email address.
  invitationAdd: Add invitation
  invitationCode: Invitation code
  invitationDelete: Delete invitation
  invitationLink: Copy invitation link
  invitationSend: Send invitation
  invitationView: View invitation
  invitationsUsed: 'Invitations used: {amountCurrent} / {amountMaximum}'
  noFeedback: no feedback
  postgresP0002: The invitation could not be sent! You may not currently have access to the necessary data. Try to reload the page.
  sendSuccess: Invitation requested successfully.
  sent: Sent!
</i18n>
