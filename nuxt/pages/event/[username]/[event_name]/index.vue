<template>
  <Loader :api="api">
    <div v-if="event" class="flex flex-col gap-4">
      <LayoutBreadcrumbs
        :prefixes="[
          { name: t('events'), to: localePath('/event') },
          {
            name: routeParamUsername,
            to: localePath(`/event/${route.params.username}`),
          },
        ]"
      >
        {{ event.name }}
      </LayoutBreadcrumbs>
      <CardStateInfo v-if="routeQueryIc && contact" class="flex flex-col gap-2">
        {{ t('invitationViewFor', { name: contactName }) }}
        <ButtonColored
          is-to-relative
          :aria-label="t('invitationSelectionClear')"
          @click="
            navigateTo({
              path: append($route.path, 'invitation'),
              query: { ...routeQuery, ic: undefined },
            })
          "
        >
          {{ t('invitationSelectionClear') }}
          <template #prefix>
            <IconArrowLeft />
          </template>
        </ButtonColored>
      </CardStateInfo>
      <div v-if="contact" class="flex flex-col gap-2">
        <div class="flex items-center gap-2 justify-between">
          <div>
            <p class="mb-2 text-2xl font-bold">
              {{
                t('greeting', {
                  usernameString: contactName ? ' ' + contactName : '',
                })
              }}
            </p>
            <p>{{ t('greetingDescription') }}</p>
          </div>
          <ButtonColored
            v-if="invitation?.feedback === 'ACCEPTED'"
            :aria-label="t('qrCodeShow')"
            class="text-text-bright"
            @click="qrCodeShow"
          >
            {{ t('qrCodeShow') }}
            <template #prefix>
              <IconQrCode />
            </template>
          </ButtonColored>
        </div>
        <div v-if="invitation" class="fixed bottom-0 right-0 left-0 z-10">
          <div
            class="grid grid-cols-6 border-t-2 bg-background-brighten dark:bg-background-darken"
            :class="
              invitation.feedback === 'ACCEPTED'
                ? 'border-green-600 dark:border-green-500'
                : invitation.feedback === 'CANCELED'
                ? 'border-red-600 dark:border-red-500'
                : 'border-text-dark dark:border-text-bright'
            "
          >
            <div
              v-if="invitation.feedback === 'ACCEPTED'"
              class="col-start-2 m-auto rounded-full bg-gray-500 px-2 text-text-bright"
            >
              {{ t('step1Of2') }}
            </div>
            <div
              class="p-4 flex flex-col items-center gap-2"
              :class="
                invitation.feedback === 'ACCEPTED' ? 'col-span-3' : 'col-span-6'
              "
            >
              <span v-if="event.authorUsername !== signedInUsername">
                {{ t('feedbackRequest') }}
              </span>
              <div class="flex items-center justify-center gap-4">
                <ButtonColored
                  v-if="
                    invitation.feedback === null ||
                    invitation.feedback === 'CANCELED'
                  "
                  :aria-label="
                    event.authorUsername !== signedInUsername
                      ? t('invitationAccept')
                      : t('invitationAcceptAdmin', {
                          name: contactName,
                        })
                  "
                  @click="accept"
                >
                  {{
                    event.authorUsername !== signedInUsername
                      ? t('invitationAccept')
                      : t('invitationAcceptAdmin', {
                          name: contactName,
                        })
                  }}
                  <template #prefix>
                    <IconCheckCircle />
                  </template>
                </ButtonColored>
                <div
                  v-if="invitation.feedback === 'ACCEPTED'"
                  class="flex items-center font-semibold text-green-600 dark:text-green-500"
                >
                  <IconCheckCircle class="mr-2" title="accepted" />
                  {{
                    event.authorUsername !== signedInUsername
                      ? t('invitationAccepted')
                      : t('invitationAcceptedAdmin', {
                          name: contactName,
                        })
                  }}
                </div>
                <ButtonColored
                  v-if="
                    invitation.feedback === null ||
                    invitation.feedback === 'ACCEPTED'
                  "
                  :aria-label="
                    event.authorUsername !== signedInUsername
                      ? t('invitationCancel')
                      : t('invitationCancelAdmin', {
                          name: contactName,
                        })
                  "
                  @click="cancel"
                >
                  {{
                    event.authorUsername !== signedInUsername
                      ? t('invitationCancel')
                      : t('invitationCancelAdmin', {
                          name: contactName,
                        })
                  }}
                  <template #prefix>
                    <IconXCircle />
                  </template>
                </ButtonColored>
                <div
                  v-if="invitation.feedback === 'CANCELED'"
                  class="flex items-center font-semibold text-red-600 dark:text-red-500"
                >
                  <IconXCircle class="mr-2" title="canceled" />
                  {{
                    event.authorUsername !== signedInUsername
                      ? t('invitationCanceled')
                      : t('invitationCanceledAdmin', {
                          name: contactName,
                        })
                  }}
                </div>
              </div>
            </div>
            <div
              v-if="
                invitation.feedback !== null &&
                invitation.feedback === 'ACCEPTED'
              "
              class="row-start-2 col-span-1 col-start-2 m-auto rounded-full bg-gray-500 px-2 text-text-bright"
            >
              {{ t('step2Of2') }}
            </div>
            <div
              v-if="
                invitation.feedback !== null &&
                invitation.feedback === 'ACCEPTED'
              "
              class="col-span-3"
            >
              <FormInput
                id-label="input-paper-invitation-feedback"
                :title="t('invitationCardKind')"
                type="select"
              >
                <select
                  id="input-paper-invitation-feedback"
                  v-model="invitation.feedbackPaper"
                  class="form-input"
                  @change="paperInvitationFeedback"
                >
                  <option disabled :value="null">
                    {{ t('requestSelection') }}
                  </option>
                  <option value="NONE">
                    {{ t('invitationCardKindNone') }}
                  </option>
                  <option value="PAPER">
                    {{ t('invitationCardKindPaper') }}
                  </option>
                  <option value="DIGITAL">
                    {{ t('invitationCardKindDigital') }}
                  </option>
                </select>
              </FormInput>
            </div>
          </div>
        </div>
      </div>
      <ButtonList
        v-if="
          !routeQueryIc &&
          jwtDecoded &&
          event.authorUsername === jwtDecoded.username
        "
        class="justify-center"
      >
        <ButtonColored
          is-to-relative
          :aria-label="t('invitations')"
          to="invitation"
        >
          {{ t('invitations') }}
          <template #prefix>
            <IconEnvelope />
          </template>
        </ButtonColored>
        <ButtonColored
          is-to-relative
          :aria-label="t('attendances')"
          to="attendance"
        >
          {{ t('attendances') }}
          <template #prefix>
            <IconUserCheck />
          </template>
        </ButtonColored>
        <ButtonColored is-to-relative :aria-label="t('settings')" to="settings">
          {{ t('settings') }}
          <template #prefix>
            <IconPencil />
          </template>
        </ButtonColored>
      </ButtonList>
      <div class="flex flex-col md:flex-row justify-between gap-2">
        <div class="flex max-w-full items-baseline gap-2">
          <h1 class="mb-0 max-w-full overflow-hidden text-ellipsis">
            {{ event.name }}
          </h1>
          <Owner link :username="event.authorUsername" />
        </div>
        <div class="flex gap-2 items-center">
          <ButtonColored
            :aria-label="t('iCalDownload')"
            :is-primary="false"
            @click="downloadIcal"
          >
            {{ t('iCalDownload') }}
            <template #prefix>
              <IconDownload />
            </template>
          </ButtonColored>
          <FormInputStateInfo :title="t('iCalHint')" />
        </div>
      </div>
      <Card v-if="event" class="flex flex-col items-center gap-8">
        <div class="flex flex-row flex-wrap justify-center self-stretch">
          <EventDashletStart :event="event" />
          <EventDashletDuration :event="event" />
          <EventDashletVisibility :event="event" with-text />
          <EventDashletAttendanceType :event="event" />
          <EventDashletLocation :event="event" />
          <EventDashletLink :event="event" />
        </div>
        <div v-if="eventDescriptionTemplate" class="flex flex-col gap-4 w-full">
          <Hr />
          <!-- eslint-disable vue/no-v-html -->
          <div class="maevsi-prose-scheme" v-html="eventDescriptionTemplate" />
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </Card>
      <Modal id="ModalInvitationQrCode" ref="modalCheckInCodeRef">
        <div v-if="invitation" class="flex flex-col items-center gap-2 pb-4">
          <QrcodeVue
            id="qrCode"
            class="bg-white p-4"
            :value="invitation.uuid"
            :size="200"
          />
          <FormInputStateInfo>
            {{ t('hintQrCode') }}
          </FormInputStateInfo>
        </div>
        <template #footer>
          <ButtonColored
            :aria-label="t('print')"
            :is-primary="false"
            @click="print"
          >
            {{ t('print') }}
            <template #prefix>
              <IconPrinter />
            </template>
          </ButtonColored>
          <ButtonColored
            :aria-label="t('close')"
            @click="store.modalRemove('ModalInvitationQrCode')"
          >
            {{ t('close') }}
            <template #prefix>
              <IconX />
            </template>
          </ButtonColored>
        </template>
      </Modal>
    </div>
    <Error v-else :status-code="403" />
  </Loader>
</template>

<script setup lang="ts">
import consola from 'consola'
import downloadJs from 'downloadjs'
import DOMPurify from 'isomorphic-dompurify'
import mustache from 'mustache'
import prntr from 'prntr'
import QrcodeVue from 'qrcode.vue'
import Swal from 'sweetalert2'

import { Invitation } from '~/types/invitation'
import {
  InvitationFeedback,
  useEventByAuthorUsernameAndSlugQuery,
  useUpdateInvitationByIdMutation,
} from '~/gql/generated'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { useMaevsiStore } from '~/store'

definePageMeta({
  async validate(route) {
    const { $urql } = useNuxtApp()

    const eventIsExisting = await $urql.value
      .query(EVENT_IS_EXISTING_QUERY, {
        slug: route.params.event_name as string,
        authorUsername: route.params.username as string,
      })
      .toPromise()

    if (eventIsExisting.error) {
      throw createError(eventIsExisting.error)
    }

    if (!eventIsExisting.data?.eventIsExisting) {
      return abortNavigation({ statusCode: 404 })
    }

    return true
  },
})

const { t } = useI18n()
const localePath = useLocalePath()
const store = useMaevsiStore()
const route = useRoute()
const { executeMutation: executeMutationUpdateInvitationById } =
  useUpdateInvitationByIdMutation()

// queries
const eventQuery = useEventByAuthorUsernameAndSlugQuery({
  variables: {
    authorUsername: route.params.username as string,
    slug: route.params.event_name as string,
    invitationUuid: route.query.ic,
  },
})

// refs
const modalCheckInCodeRef = ref()

// api data
const api = computed(() =>
  reactive({
    data: {
      ...eventQuery.data.value,
    },
    ...getApiMeta([eventQuery]),
  })
)
const event = computed(
  () => eventQuery.data.value?.eventByAuthorUsernameAndSlug
)

// data
const routeParamUsername = route.params.username as string

// methods
function accept() {
  if (invitation.value === undefined) {
    return
  }
  update(invitation.value.id, {
    feedback: InvitationFeedback.Accepted,
  })
}
function cancel() {
  if (invitation.value === undefined) {
    return
  }
  update(invitation.value.id, {
    feedback: InvitationFeedback.Canceled,
  })
}
function paperInvitationFeedback() {
  if (!invitation.value) return

  update(invitation.value.id, {
    feedbackPaper: invitation.value.feedbackPaper,
  })
}
function downloadIcal() {
  const xhr = new XMLHttpRequest()
  const fileName =
    route.params.username + '_' + route.params.event_name + '.ics'

  xhr.open('POST', '/api/ical', true)
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      switch (xhr.status) {
        case 200:
          downloadJs(new Blob([xhr.responseText]), fileName, 'text/calendar')
          return
        default:
          Swal.fire({
            icon: 'error',
            text: t('iCalUnexpectedStatusCode'), // TODO: add suggestion (https://github.com/maevsi/maevsi/issues/903)
            title: t('globalStatusError'),
          })
      }
    }
  }
  xhr.send(
    JSON.stringify({
      contact: contact.value,
      event: event.value,
      invitation: invitation.value,
    })
  )
}
function print() {
  prntr({
    printable: 'qrCode',
    type: 'html',
  })
}
function qrCodeShow() {
  store.modalAdd({ id: 'ModalInvitationQrCode' })
}
async function update(id: string, invitationPatch: Partial<Invitation>) {
  const result = await executeMutationUpdateInvitationById({
    id,
    invitationPatch,
  })

  if (result.error) {
    api.value.errors.push(result.error)
    consola.error(result.error)
  }

  if (!result.data) {
    return
  }

  Swal.fire({
    icon: 'success',
    showConfirmButton: false,
    timer: 1500,
    text: t('success') as string,
    timerProgressBar: true,
    title: t('saved'),
  })
}

// computations
const contact = computed(() => {
  return invitation?.value?.contactByContactId
})
const contactName = computed(() => {
  return invitation?.value?.contactByContactId
    ? getContactName(invitation?.value.contactByContactId)
    : undefined
})
const eventDescription = computed(() => {
  return event.value?.description || t('globalLoading')
})
const eventDescriptionTemplate = computed(() => {
  if (!event.value?.description) return

  return DOMPurify.sanitize(
    mustache.render(event.value.description, {
      contact: contact.value,
      event,
      invitation: invitation.value,
    })
  )
})
const invitation = computed(() => {
  const invitations = event?.value?.invitationsByEventId.nodes

  const invitationsMatchingUuid =
    store.signedInUsername === route.params.username && invitations
      ? invitations.filter(
          (invitation: Invitation) => invitation.uuid === route.query.ic
        )
      : invitations

  if (invitationsMatchingUuid?.length) {
    if (invitationsMatchingUuid.length > 1) {
      Swal.fire({
        icon: 'warning',
        text: t('invitationCodeMultipleWarning') as string,
        title: t('globalStatusWarning'),
      })
    }

    return invitationsMatchingUuid[0]
  }

  return undefined
})
const jwtDecoded = computed(() => store.jwtDecoded)
const routeQuery = computed(() => route.query)
const routeQueryIc = computed(() => route.query.ic)
const signedInUsername = computed(() => store.signedInUsername)
const title = computed(() =>
  api.value.isFetching ? t('globalLoading') : event.value?.name || '403'
)

// lifecycle
watch(eventQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})

// initialization
useHeadDefault(title, {
  meta: [
    {
      hid: 'description',
      property: 'description',
      content: eventDescription.value,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: eventDescription.value,
    },
    {
      hid: 'twitter:description',
      property: 'twitter:description',
      content: eventDescription.value,
    },
  ],
})
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yaml">
de:
  attendances: Check-in
  close: Schließen
  events: Veranstaltungen
  feedbackRequest: 'Bitte gib eine Rückmeldung, ob du teilnehmen wirst:'
  greeting: Hey{usernameString}!
  greetingDescription: Du wurdest zu folgender Veranstaltung eingeladen.
  hintQrCode: Dieses Bild ist deine Zugangsberechtigung für die Veranstaltung
  iCalDownload: Als Kalendereintrag herunterladen
  iCalHint: Die heruntergeladene Datei kann dann mit deiner Kalender-Anwendung geöffnet werden.
  iCalUnexpectedStatusCode: iCal-Daten konnten nicht geladen werden!
  invitationAccept: Einladung annehmen
  invitationAcceptAdmin: Einladung im Namen von {name} annehmen
  invitationAccepted: Einladung angenommen
  invitationAcceptedAdmin: Einladung im Namen von {name} angenommen
  invitationCancel: Einladung ablehnen
  invitationCancelAdmin: Einladung im Namen von {name} ablehnen
  invitationCanceled: Einladung abgelehnt
  invitationCanceledAdmin: Einladung im Namen von {name} abgelehnt
  invitationCardKind: Art der Einladungskarte
  invitationCardKindNone: Keine
  invitationCardKindPaper: Papier
  invitationCardKindDigital: Digital
  invitationCodeMultipleWarning: Es wurden mehrere Einladungscodes für dieselbe Veranstaltung eingelöst! Diese Seite zeigt die Daten des zuerst gefundenen an.
  invitationSelectionClear: Zurück zur Einladungsübersicht
  invitationViewFor: Du schaust dir die Einladung für {name} an. Nur du und {name} können diese Seite sehen.
  invitations: Einladungen
  print: Drucken
  qrCodeShow: Check-in-Code anzeigen
  requestSelection: Bitte auswählen
  saved: Gespeichert!
  settings: Bearbeiten
  step1Of2: 1/2
  step2Of2: 2/2
  success: Deine Eingabe wurde erfolgreich gespeichert.
en:
  attendances: Check in
  close: Close
  events: events
  feedbackRequest: 'Please confirm if you will attend:'
  greeting: Hey{usernameString}!
  greetingDescription: "You've been invited to the following event."
  hintQrCode: This picture is your access authorization for the event
  iCalDownload: Download for your calendar
  iCalHint: You can open the downloaded file in your calendar app.
  iCalUnexpectedStatusCode: Could not get iCal data!
  invitationAccept: Accept invitation
  invitationAcceptAdmin: Accept invitation on behalf of {name}
  invitationAccepted: Invitation accepted
  invitationAcceptedAdmin: Invitation accepted on behalf of {name}
  invitationCancel: Decline invitation
  invitationCancelAdmin: Decline invitation on behalf of {name}
  invitationCanceled: Invitation declined
  invitationCanceledAdmin: Invitation declined on behalf of {name}
  invitationCardKind: Type of invitation card
  invitationCardKindNone: None
  invitationCardKindPaper: Paper
  invitationCardKindDigital: Digital
  invitationCodeMultipleWarning: Multiple invitation codes have already been redeemed for the same event! This page shows data for the first code found.
  invitationSelectionClear: Back to the invitation overview
  invitationViewFor: You're viewing the invitation for {name}. Only you and {name} can see this page.
  invitations: Invitations
  print: Print
  qrCodeShow: Show check in code
  requestSelection: Please select
  saved: Saved!
  settings: Edit
  step1Of2: 1/2
  step2Of2: 2/2
  success: Your input was saved succesfully.
</i18n>
