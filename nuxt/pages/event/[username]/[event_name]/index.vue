<template>
  <Loader :api="api">
    <div v-if="event" class="flex flex-col gap-4">
      <Breadcrumbs
        :prefixes="[
          { name: t('events'), to: '../..', append: true },
          { name: routeParamUsername, to: '..', append: true },
        ]"
      >
        {{ event.name }}
      </Breadcrumbs>
      <CardStateInfo v-if="routeQueryIc && contact" class="flex flex-col gap-2">
        {{ t('invitationViewFor', { name: contactName }) }}
        <ButtonColored
          append
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
            class="border-t-2 bg-background-brighten dark:bg-background-darken"
            :class="
              invitation.feedback === 'ACCEPTED'
                ? 'border-green-600 dark:border-green-500'
                : invitation.feedback === 'CANCELED'
                ? 'border-red-600 dark:border-red-500'
                : 'border-text-dark dark:border-text-bright'
            "
          >
            <div class="p-4 flex flex-col items-center gap-2">
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
            <!--
            <div
              v-if="invitation.feedback === 'ACCEPTED'"
              class="col-span-1 m-auto rounded-full bg-gray-500 px-2 text-text-bright"
            >
              {{ t('step1Of2') }}
            </div>
            <div
              v-if="
                invitation.feedback !== null && invitation.feedback === 'ACCEPTED'
              "
              class="col-span-5"
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
            <div
              v-if="
                invitation.feedback !== null && invitation.feedback === 'ACCEPTED'
              "
              class="col-span-1 m-auto rounded-full bg-gray-500 px-2 text-text-bright"
            >
              {{ t('step2Of2') }}
            </div> -->
          </div>
        </div>
      </div>
      <ButtonList
        v-if="
          !routeQueryIc &&
          jwtDecoded &&
          event.authorUsername === jwtDecoded.username
        "
      >
        <ButtonColored append :aria-label="t('invitations')" to="invitation">
          {{ t('invitations') }}
          <template #prefix>
            <IconEnvelope />
          </template>
        </ButtonColored>
        <ButtonColored append :aria-label="t('attendances')" to="attendance">
          {{ t('attendances') }}
          <template #prefix>
            <IconUserCheck />
          </template>
        </ButtonColored>
        <ButtonColored append :aria-label="t('settings')" to="settings">
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
      <Modal id="ModalInvitationQrCode" ref="ModalCheckInCode">
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
            @click="closeModalInvitationQrCode()"
          >
            {{ t('close') }}
            <template #prefix>
              <IconX />
            </template>
          </ButtonColored>
        </template>
      </Modal>
    </div>
  </Loader>
</template>

<script lang="ts">
import consola from 'consola'
import downloadJs from 'downloadjs'
import DOMPurify from 'isomorphic-dompurify'
import mustache from 'mustache'
import prntr from 'prntr'
import QrcodeVue from 'qrcode.vue'
import Swal from 'sweetalert2'
import { computed, defineComponent, reactive, ref, watch } from 'vue'

import { useRouter, useRoute, abortNavigation } from '#app'
import { useHead } from '#head'

import { Contact } from '~/types/contact'
import { Invitation } from '~/types/invitation'
import { append, getApiMeta } from '~/plugins/util/util'
import { getContactName } from '~/plugins/util/model'
import {
  InvitationFeedback,
  useEventByAuthorUsernameAndSlugQuery,
  useEventIsExistingQuery,
  useUpdateInvitationByIdMutation,
} from '~/gql/generated'
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const route = useRoute()

      const eventIsExisting = useEventIsExistingQuery({
        variables: {
          slug: route.params.event_name as string,
          authorUsername: route.params.username as string,
        },
      }).executeQuery()

      if (
        eventIsExisting.error ||
        eventIsExisting.data.value?.eventIsExisting
      ) {
        return abortNavigation() // TODO: { statusCode: 403 }
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  components: {
    QrcodeVue,
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const store = useMaevsiStore()
    const route = useRoute()
    const { executeMutation: executeMutationUpdateInvitationById } =
      useUpdateInvitationByIdMutation()

    const eventQuery = useEventByAuthorUsernameAndSlugQuery({
      variables: {
        authorUsername: route.params.username as string,
        slug: route.params.event_name as string,
        invitationUuid: route.query.ic,
      },
    })

    const refs = {
      ModalCheckInCode: ref(),
    }
    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...eventQuery.data.value,
          },
          ...getApiMeta([eventQuery]),
        }
      }),
      event: computed(
        () => eventQuery.data.value?.eventByAuthorUsernameAndSlug
      ),
    }
    const data = reactive({
      contact: undefined as Contact | undefined,
      invitation: undefined as Invitation | undefined,
      jwtDecoded: store.jwtDecoded,
      routeParamUsername: route.params.username as string,
      routeQuery: route.query,
      routeQueryIc: route.query.ic,
      signedInUsername: store.signedInUsername,
    })
    const methods = {
      accept() {
        if (data.invitation === undefined) {
          return
        }
        methods.update(data.invitation.id, {
          feedback: InvitationFeedback.Accepted,
        })
      },
      append,
      cancel() {
        if (data.invitation === undefined) {
          return
        }
        methods.update(data.invitation.id, {
          feedback: InvitationFeedback.Canceled,
        })
      },
      closeModalInvitationQrCode() {
        refs.ModalCheckInCode.value.close()
      },
      // paperInvitationFeedback() {
      //   if (data.invitation === undefined) {
      //     return
      //   }
      //   const invitation = data.invitation as Invitation
      //   methods.update(invitation.id, {
      //     feedbackPaper: invitation.feedbackPaper,
      //   })
      // },
      downloadIcal() {
        const xhr = new XMLHttpRequest()
        const fileName =
          route.params.username + '_' + route.params.event_name + '.ics'

        xhr.open('POST', '/api/ical', true)
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            switch (xhr.status) {
              case 200:
                downloadJs(
                  new Blob([xhr.responseText]),
                  fileName,
                  'text/calendar'
                )
                return
              default:
                Swal.fire({
                  icon: 'error',
                  text: t('iCalUnexpectedStatusCode', {
                    statusCode: xhr.status,
                  }) as string,
                  title: t('globalStatusError'),
                })
            }
          }
        }
        xhr.send(
          JSON.stringify({
            contact: data.contact,
            event: apiData.event,
            invitation: data.invitation,
          })
        )
      },
      print() {
        prntr({
          printable: 'qrCode',
          type: 'html',
        })
      },
      qrCodeShow() {
        store.modalAdd({ id: 'ModalInvitationQrCode' })
      },
      t,
      async update(id: string, invitationPatch: Partial<Invitation>) {
        const result = await executeMutationUpdateInvitationById({
          id,
          invitationPatch,
        })

        if (result.error) {
          apiData.api.value.errors.push(result.error)
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
        // TODO: cache update (event)
      },
    }
    const computations = {
      contact: computed((): Contact | undefined => {
        return data.invitation?.contactByContactId
      }),
      contactName: computed(() => {
        return data.invitation?.contactByContactId
          ? getContactName(data.invitation?.contactByContactId)
          : undefined
      }),
      eventDescriptionTemplate: computed(() => {
        if (!apiData.event?.value?.description) return

        return DOMPurify.sanitize(
          mustache.render(apiData.event.value.description, {
            contact: data.contact,
            event: apiData.event,
            invitation: data.invitation,
          })
        )
      }),
      invitation: computed((): Invitation | undefined => {
        const invitations = apiData.event?.value?.invitationsByEventId.nodes

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
      }),
      title: computed(() => {
        return apiData.event?.value?.name
      }),
    }

    watch(eventQuery.error, (currentValue, _oldValue) => {
      if (currentValue) consola.error(currentValue)
    })

    useHead({
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: computations.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            router.currentRoute.value.fullPath,
        },
        {
          hid: 'description',
          property: 'description',
          content: apiData.event.value?.description,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: apiData.event.value?.description,
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: apiData.event.value?.description,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: computations.title,
        },
      ],
      title: computations.title.value,
    })

    return {
      ...apiData,
      ...data,
      ...methods,
      ...computations,
    }
  },
})
</script>

<i18n lang="yml">
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
  iCalUnexpectedStatusCode: 'iCal-Daten konnten nicht geladen werden: Statuscode {statusCode}.'
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
  feedbackRequest: 'Please provide feedback whether you will be attending:'
  greeting: Hey{usernameString}!
  greetingDescription: "You've been invited to the following event."
  hintQrCode: This picture is your access authorization for the event
  iCalDownload: Download as calendar item
  iCalHint: You can open the downloaded file with your calendar app then.
  iCalUnexpectedStatusCode: 'Could not get iCal data: Status code {statusCode}.'
  invitationAccept: Accept invitation
  invitationAcceptAdmin: Accept invitation on behalf of {name}
  invitationAccepted: Invitation accepted
  invitationAcceptedAdmin: Invitation accepted on behalf of {name}
  invitationCancel: Decline invitation
  invitationCancelAdmin: Decline invitation on behalf of {name}
  invitationCanceled: Invitation declined
  invitationCanceledAdmin: Invitation declined on behalf of {name}
  invitationCardKind: Kind of invitation card
  invitationCardKindNone: None
  invitationCardKindPaper: Paper
  invitationCardKindDigital: Digital
  invitationCodeMultipleWarning: Multiple invitation codes were redeemed for the same event! This page shows data for the first code found.
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
