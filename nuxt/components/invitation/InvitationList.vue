<template>
  <Loader
    v-if="($apollo.loading && !allInvitations) || graphqlError"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
  />
  <div v-else class="flex flex-col gap-4">
    <ScrollContainer
      v-if="event && allInvitations.nodes.length > 0"
      :has-next-page="allInvitations.pageInfo.hasNextPage"
      @loadMore="loadMore"
    >
      <table>
        <thead>
          <tr>
            <th scope="col">
              {{ $t('contact') }}
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
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
            <td class="max-w-0">
              <div
                class="flex items-center justify-evenly gap-4 text-text-dark dark:text-text-bright"
              >
                <ButtonIcon
                  :aria-label="
                    invitation.contactByContactId.accountUsername ||
                    invitation.contactByContactId.emailAddress
                      ? $t('invitationSend')
                      : $t('disabledReasonEmailAddressNone')
                  "
                  class="hidden md:block"
                  :disabled="
                    (!invitation.contactByContactId.accountUsername &&
                      !invitation.contactByContactId.emailAddress) ||
                    pending.sends.includes(invitation.uuid)
                  "
                  @click="send(invitation)"
                >
                  <IconPaperPlane />
                </ButtonIcon>
                <ButtonIcon
                  :aria-label="$t('invitationLink')"
                  class="hidden md:block"
                  @click="copyLink(invitation)"
                >
                  <IconLink />
                </ButtonIcon>
                <DropDown>
                  <ButtonIcon :aria-label="$t('globalShowMore')">
                    <IconDotsVertical />
                  </ButtonIcon>
                  <template slot="content">
                    <ButtonText
                      :aria-label="
                        invitation.contactByContactId.accountUsername ||
                        invitation.contactByContactId.emailAddress
                          ? $t('invitationSend')
                          : $t('disabledReasonEmailAddressNone')
                      "
                      class="block md:hidden"
                      :disabled="
                        (!invitation.contactByContactId.accountUsername &&
                          !invitation.contactByContactId.emailAddress) ||
                        pending.sends.includes(invitation.uuid)
                      "
                      @click="send(invitation)"
                    >
                      <IconPaperPlane />
                      {{
                        invitation.contactByContactId.accountUsername ||
                        invitation.contactByContactId.emailAddress
                          ? $t('invitationSend')
                          : $t('disabledReasonEmailAddressNone')
                      }}
                    </ButtonText>
                    <ButtonText
                      :aria-label="$t('invitationLink')"
                      class="block md:hidden"
                      @click="copyLink(invitation)"
                    >
                      <IconLink />
                      {{ $t('invitationLink') }}
                    </ButtonText>
                    <ButtonText
                      :aria-label="$t('invitationView')"
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
                      {{ $t('invitationView') }}
                    </ButtonText>
                    <ButtonText
                      :aria-label="$t('invitationDelete')"
                      :disabled="pending.deletions.includes(invitation.uuid)"
                      @click="delete_(invitation.uuid)"
                    >
                      <IconTrash />
                      {{ $t('invitationDelete') }}
                    </ButtonText>
                  </template>
                </DropDown>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </ScrollContainer>
    <div class="flex flex-col items-center gap-1">
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
    <div v-if="allInvitations.totalCount > 0">
      <h2>
        {{ $t('feedback') }}
      </h2>
      <div class="m-auto w-3/4 sm:w-1/2 xl:w-1/3 2xl:w-1/4">
        <!-- https://github.com/reg-viz/storycap/issues/501 -->
        <Doughnut
          v-if="!$config.STORYBOOK"
          ref="doughnut"
          :chart-data="data"
          :chart-options="options"
        />
      </div>
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
  DoughnutController,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import consola from 'consola'
import Swal from 'sweetalert2'
import { Doughnut } from 'vue-chartjs/legacy'

import { defineComponent, PropType } from '#app'
import INVITATION_DELETE_MUTATION from '~/gql/mutation/invitation/invitationDelete.gql'
import INVITE_MUTATION from '~/gql/mutation/invitation/invite.gql'
import INVITATIONS_ALL_QUERY from '~/gql/query/invitation/invitationsAll.gql'
import { copyText } from '~/plugins/static/util'
import { Event as MaevsiEvent } from '~/types/event'
import { Invitation } from '~/types/invitation'

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  Title,
  Tooltip,
  Legend
)

export default defineComponent({
  components: {
    Doughnut,
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
          const invitations = data.data.allInvitations.nodes
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
            onClick: null,
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
  watch: {
    $colorMode: {
      handler() {
        ;(this.$refs.doughnut as any)?.getCurrentChart()?.update()
      },
      deep: true,
    },
  },
  mounted() {
    Chart.defaults.color = () =>
      this.$colorMode.value === 'dark' ? '#fff' : '#000'
  },
  methods: {
    add() {
      this.$store.commit('modalAdd', { id: 'ModalInvitation' })
    },
    copyLink(invitation: Invitation): void {
      if (!process.browser) return

      copyText(
        `${window.location.origin}${this.localePath(`/task/event/unlock`)}?ic=${
          invitation.uuid
        }`
      ).then(() => {
        Swal.fire({
          icon: 'success',
          text: this.$t('copySuccess') as string,
          timer: 3000,
          timerProgressBar: true,
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
          Swal.fire({
            icon: 'success',
            text: this.$t('sendSuccess') as string,
            timer: 3000,
            timerProgressBar: true,
            title: this.$t('sent'),
          })
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
  feedback: Rückmeldungen
  invitationAdd: Gäste hinzufügen
  invitationDelete: Einladung löschen
  invitationLink: Einladungslink kopieren
  invitationSend: Einladung versenden
  invitationView: Einladung anzeigen
  invitationsUsed: 'Einladungen benutzt: {amountCurrent} / {amountMaximum}'
  noFeedback: kein Feedback
  postgresP0002: Die Einladung konnte nicht versandt werden! Möglicherweise hast du aktuell keinen Zugriff auf die notwendigen Daten. Versuche die Seite neu zu laden.
  sendSuccess: Die Einladung wurde erfolgreich per E-Mail versandt.
  sent: Gesendet!
en:
  accepted: accepted
  canceled: declined
  contact: Contact
  contactSelect: Select Contact
  copied: Copied
  copySuccess: The invitation link was copied to the clipboard.
  disabledReasonEmailAddressNone: This contact is missing an email address.
  feedback: Feedback
  invitationAdd: Add guests
  invitationDelete: Delete invitation
  invitationLink: Copy invitation link
  invitationSend: Send invitation
  invitationView: View invitation
  invitationsUsed: 'Invitations used: {amountCurrent} / {amountMaximum}'
  noFeedback: no feedback
  postgresP0002: The invitation could not be sent! You may not currently have access to the necessary data. Try to reload the page.
  sendSuccess: The invitation was successfully sent by email.
  sent: Sent!
</i18n>
