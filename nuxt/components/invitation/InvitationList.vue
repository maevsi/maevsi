<template>
  <Loader
    :api="api"
    :error-pg-ids="{
      postgresP0002: t('postgresP0002'),
    }"
  >
    <div class="flex flex-col gap-4">
      <ScrollContainer
        v-if="event && invitations?.length"
        class="max-h-[70vh]"
        :has-next-page="!!api.data.allInvitations?.pageInfo.hasNextPage"
        @load-more="after = api.data.allInvitations?.pageInfo.endCursor"
      >
        <table class="border border-neutral-300 dark:border-neutral-600">
          <thead
            class="sticky top-0 z-10 bg-background-bright dark:bg-background-dark"
          >
            <tr>
              <th scope="col">
                {{ t('contact') }}
              </th>
              <th />
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-300 dark:divide-neutral-600">
            <tr
              v-for="invitation in invitations"
              :key="invitation.uuid"
              :class="{
                'animate-pulse': pending.deletions.includes(invitation.uuid),
              }"
            >
              <td class="max-w-0">
                <ContactPreview
                  v-if="invitation.contactByContactId"
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
                      invitation.contactByContactId?.accountUsername ||
                      invitation.contactByContactId?.emailAddress
                        ? t('invitationSend')
                        : t('disabledReasonEmailAddressNone')
                    "
                    class="hidden md:block"
                    :disabled="
                      (!invitation.contactByContactId?.accountUsername &&
                        !invitation.contactByContactId?.emailAddress) ||
                      pending.sends.includes(invitation.uuid)
                    "
                    @click="send(invitation)"
                  >
                    <IconPaperPlane />
                  </ButtonIcon>
                  <ButtonIcon
                    :aria-label="t('invitationLink')"
                    class="hidden md:block"
                    @click="copyLink(invitation)"
                  >
                    <IconLink />
                  </ButtonIcon>
                  <DropDown>
                    <ButtonIcon :aria-label="t('globalShowMore')">
                      <IconDotsVertical />
                    </ButtonIcon>
                    <template #content>
                      <ButtonIcon
                        :aria-label="
                          invitation.contactByContactId?.accountUsername ||
                          invitation.contactByContactId?.emailAddress
                            ? t('invitationSend')
                            : t('disabledReasonEmailAddressNone')
                        "
                        class="block md:hidden"
                        :disabled="
                          (!invitation.contactByContactId?.accountUsername &&
                            !invitation.contactByContactId?.emailAddress) ||
                          pending.sends.includes(invitation.uuid)
                        "
                        @click="send(invitation)"
                      >
                        <IconPaperPlane />
                        {{
                          invitation.contactByContactId?.accountUsername ||
                          invitation.contactByContactId?.emailAddress
                            ? t('invitationSend')
                            : t('disabledReasonEmailAddressNone')
                        }}
                      </ButtonIcon>
                      <ButtonIcon
                        :aria-label="t('invitationLink')"
                        class="block md:hidden"
                        @click="copyLink(invitation)"
                      >
                        <IconLink />
                        {{ t('invitationLink') }}
                      </ButtonIcon>
                      <ButtonIcon
                        :aria-label="t('invitationView')"
                        @click="
                          navigateTo({
                            path: localePath(
                              `/event/${event.authorUsername}/${event.slug}`
                            ),
                            query: { ic: invitation.uuid },
                          })
                        "
                      >
                        <IconEye />
                        {{ t('invitationView') }}
                      </ButtonIcon>
                      <ButtonIcon
                        :aria-label="t('invitationDelete')"
                        :disabled="pending.deletions.includes(invitation.uuid)"
                        @click="delete_(invitation.id)"
                      >
                        <IconTrash />
                        {{ t('invitationDelete') }}
                      </ButtonIcon>
                    </template>
                  </DropDown>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </ScrollContainer>
      <div v-else class="flex flex-col items-center gap-2">
        {{ t('invitationNone') }}
        <FormInputStateInfo>
          {{ t('hintInviteSelf') }}
        </FormInputStateInfo>
      </div>
      <div class="flex flex-col items-center gap-1">
        <ButtonColored
          :aria-label="t('invitationAdd')"
          :disabled="
            event.inviteeCountMaximum && api.data.allInvitations?.totalCount
              ? api.data.allInvitations.totalCount >= event.inviteeCountMaximum
              : false
          "
          @click="add()"
        >
          {{ t('invitationAdd') }}
          <template #prefix>
            <IconPlus />
          </template>
        </ButtonColored>
        <p class="text-center text-gray-500 dark:text-gray-400">
          {{
            t('invitationsUsed', {
              amountCurrent: api.data.allInvitations?.totalCount,
              amountMaximum: event.inviteeCountMaximum || '∞',
            })
          }}
        </p>
      </div>
      <div v-if="api.data.allInvitations?.totalCount">
        <h2>
          {{ t('feedback') }}
        </h2>
        <div class="m-auto w-3/4 sm:w-1/2 xl:w-1/3 2xl:w-1/4">
          <Doughnut
            v-if="!isTesting"
            ref="doughnutRef"
            :chart-data="dataComputed"
            :chart-options="options"
          />
        </div>
      </div>
      <Modal id="ModalInvitation">
        <FormInvitation
          :event="event"
          :invitation-contact-ids-existing="
            invitations?.map((i) => i.contactId)
          "
          @submit-success="store.modalRemove('ModalInvitation')"
        />
        <template #header>
          {{ t('contactSelect') }}
        </template>
        <template #footer />
      </Modal>
    </div>
  </Loader>
</template>

<script setup lang="ts">
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
import { Doughnut } from 'vue-chartjs/dist/index' // TODO: wait for vue-chartjs support chartjs v4 (https://github.com/apertureless/vue-chartjs/pull/934)

import { Invitation } from '~/types/invitation'
import {
  useAllInvitationsQuery,
  useDeleteInvitationByIdMutation,
  useInviteMutation,
} from '~/gql/generated'
import { useMaevsiStore } from '~/store'
import { Event } from '~/types/event'

export interface Props {
  event: Event
}
const props = withDefaults(defineProps<Props>(), {})

const { $colorMode } = useNuxtApp()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const store = useMaevsiStore()
const deleteInvitationByIdMutation = useDeleteInvitationByIdMutation()
const inviteMutation = useInviteMutation()
const config = useRuntimeConfig()

// refs
const after = ref<string>()
const doughnutRef = ref()

// queries
const invitationsQuery = useAllInvitationsQuery({
  variables: {
    after,
    eventId: +props.event.id,
    first: ITEMS_PER_PAGE_LARGE,
  },
})

// api data
const api = computed(() =>
  reactive({
    data: {
      ...invitationsQuery.data.value,
    },
    ...getApiMeta([
      deleteInvitationByIdMutation,
      inviteMutation,
      invitationsQuery,
    ]),
  })
)
const invitations = computed(
  () => invitationsQuery.data.value?.allInvitations?.nodes
)

// data
const isTesting = config.public.isTesting
const options = {
  plugins: {
    legend: {
      labels: {
        font: {
          fontFamily:
            'Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          size: 16,
        },
      },
      onClick: () => {},
    },
  },
}
const pending = reactive({
  deletions: ref<string[]>([]),
  edits: ref<string[]>([]),
  sends: ref<string[]>([]),
})

// methods
function add() {
  store.modalAdd({ id: 'ModalInvitation' })
}
function copyLink(invitation: Invitation): void {
  if (!process.client) return

  copyText(
    `${window.location.origin}${localePath(`/task/event/unlock`)}?ic=${
      invitation.uuid
    }`
  ).then(() => {
    Swal.fire({
      icon: 'success',
      text: t('copySuccess') as string,
      timer: 3000,
      timerProgressBar: true,
      title: t('copied'),
    })
  })
}
async function delete_(id: string) {
  pending.deletions.push(id)
  api.value.errors = []

  const result = await deleteInvitationByIdMutation.executeMutation({
    id,
  })

  pending.deletions.splice(pending.deletions.indexOf(id), 1)

  if (result.error) {
    api.value.errors.push(result.error)
    consola.error(result.error)
  }
}
async function send(invitation: any) {
  pending.sends.push(invitation.uuid)
  api.value.errors = []

  const result = await inviteMutation.executeMutation({
    invitationId: invitation.id,
    language: locale.value,
  })

  pending.sends.splice(pending.sends.indexOf(invitation.uuid), 1)

  if (result.error) {
    api.value.errors.push(result.error)
    consola.error(result.error)
  }

  if (!result.data) {
    return
  }

  Swal.fire({
    icon: 'success',
    text: t('sendSuccess') as string,
    timer: 3000,
    timerProgressBar: true,
    title: t('sent'),
  })
}

// computations
const dataComputed = computed(() => {
  const datasetData = [0, 0, 0]

  if (invitations.value) {
    for (const invitation of invitations.value) {
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
  }

  return {
    labels: [t('accepted'), t('canceled'), t('noFeedback')],
    datasets: [
      {
        data: datasetData,
        backgroundColor: ['#00FF00', '#FF0000', '#888888'],
      },
    ],
  }
})

// lifecycle
onMounted(() => {
  Chart.defaults.color = () => ($colorMode.value === 'dark' ? '#fff' : '#000')
})
watch(
  () => $colorMode.value,
  (_currentValue, _oldValue) => {
    doughnutRef.value.updateChart()
  }
)
watch(invitationsQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})

// initialization
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  Title,
  Tooltip,
  Legend
)
</script>

<i18n lang="yaml">
de:
  accepted: akzeptiert
  canceled: abgelehnt
  contact: Kontakt
  contactSelect: Kontakt auswählen
  copied: Kopiert
  copySuccess: Der Einladungslink wurde in die Zwischenablage kopiert.
  disabledReasonEmailAddressNone: Diesem Kontakt fehlt eine E-Mail-Adresse.
  feedback: Rückmeldungen
  hintInviteSelf: 'Tipp: du kannst dich auch zuerst selbst einladen'
  invitationAdd: Gäste hinzufügen
  invitationDelete: Einladung löschen
  invitationLink: Einladungslink kopieren
  invitationNone: Es wurde noch kein Gast hinzugefügt 😕
  invitationSend: Einladung versenden
  invitationView: Einladung anzeigen
  invitationsUsed: 'Einladungen benutzt: {amountCurrent} / {amountMaximum}'
  noFeedback: keine Rückmeldung
  postgresP0002: Die Einladung konnte nicht versandt werden! Möglicherweise hast du aktuell keinen Zugriff auf die notwendigen Daten. Versuche die Seite neu zu laden.
  sendSuccess: Die Einladung wurde erfolgreich per E-Mail versandt.
  sent: Gesendet!
en:
  accepted: accepted
  canceled: declined
  contact: Contact
  contactSelect: Select Contact
  copied: Copied
  copySuccess: The invitation link has been copied to the clipboard.
  disabledReasonEmailAddressNone: This contact does not have an associated email address.
  feedback: Invitation responses
  hintInviteSelf: 'Hint: you can also invite yourself first'
  invitationAdd: Add guests
  invitationDelete: Delete invitation
  invitationLink: Copy invitation link
  invitationNone: No guest has been added yet 😕
  invitationSend: Send invitation
  invitationView: View invitation
  invitationsUsed: 'Invitations used: {amountCurrent} / {amountMaximum}'
  noFeedback: no response
  postgresP0002: The invitation could not be sent! You may not have access to the necessary data right now. Try reloading the page.
  sendSuccess: The invitation was successfully sent by email.
  sent: Sent!
</i18n>
