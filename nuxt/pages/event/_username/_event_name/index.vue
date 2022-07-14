<template>
  <Loader
    v-if="($apollo.loading && !event) || graphqlError"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
  />
  <div v-else class="flex flex-col gap-4">
    <Breadcrumbs
      :prefixes="[
        { name: $t('events'), to: '../..', append: true },
        { name: $route.params.username, to: '..', append: true },
      ]"
    >
      {{ event.name }}
    </Breadcrumbs>
    <CardStateInfo
      v-if="$route.query.ic && contact"
      class="flex flex-col gap-2"
    >
      {{ $t('invitationViewFor', { name: $util.getContactName(contact) }) }}
      <ButtonColored
        append
        :aria-label="$t('invitationSelectionClear')"
        @click="
          $router.push({
            append: true,
            path: 'invitation',
            query: { ...$route.query, ic: undefined },
          })
        "
      >
        {{ $t('invitationSelectionClear') }}
        <template slot="prefix">
          <IconArrowLeft />
        </template>
      </ButtonColored>
    </CardStateInfo>
    <div v-if="contact" class="flex flex-col items-center gap-2 text-center">
      <ButtonColored
        v-if="invitation.feedback === 'ACCEPTED'"
        :aria-label="$t('qrCodeShow')"
        class="text-text-bright"
        @click="qrCodeShow"
      >
        {{ $t('qrCodeShow') }}
        <template slot="prefix">
          <IconQrCode />
        </template>
      </ButtonColored>
      <p class="mb-2 text-2xl font-bold">
        {{
          $t('greeting', {
            usernameString: $util.getContactName(contact)
              ? ' ' + $util.getContactName(contact)
              : '',
          })
        }}
      </p>
      <p>{{ $t('greetingDescription') }}</p>
      <div v-if="invitation" class="fixed bottom-0 z-10">
        <div
          class="justify-content-center inline-block rounded-t-lg border-2 border-b-0 bg-background-bright dark:bg-background-dark"
          :class="
            invitation.feedback === 'ACCEPTED'
              ? 'border-green-600 dark:border-green-500'
              : invitation.feedback === 'CANCELED'
              ? 'border-red-600 dark:border-red-500'
              : 'border-text-dark dark:border-text-bright'
          "
        >
          <div class="m-4 flex flex-col gap-1">
            <span v-if="event.authorUsername !== signedInUsername">
              {{ $t('feedbackRequest') }}
            </span>
            <div class="flex items-center justify-center gap-4">
              <ButtonColored
                v-if="
                  invitation.feedback === null ||
                  invitation.feedback === 'CANCELED'
                "
                :aria-label="
                  event.authorUsername !== signedInUsername
                    ? $t('invitationAccept')
                    : $t('invitationAcceptAdmin', {
                        name: $util.getContactName(contact),
                      })
                "
                @click="accept"
              >
                {{
                  event.authorUsername !== signedInUsername
                    ? $t('invitationAccept')
                    : $t('invitationAcceptAdmin', {
                        name: $util.getContactName(contact),
                      })
                }}
                <template slot="prefix">
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
                    ? $t('invitationAccepted')
                    : $t('invitationAcceptedAdmin', {
                        name: $util.getContactName(contact),
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
                    ? $t('invitationCancel')
                    : $t('invitationCancelAdmin', {
                        name: $util.getContactName(contact),
                      })
                "
                @click="cancel"
              >
                {{
                  event.authorUsername !== signedInUsername
                    ? $t('invitationCancel')
                    : $t('invitationCancelAdmin', {
                        name: $util.getContactName(contact),
                      })
                }}
                <template slot="prefix">
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
                    ? $t('invitationCanceled')
                    : $t('invitationCanceledAdmin', {
                        name: $util.getContactName(contact),
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
            {{ $t('step1Of2') }}
          </div>
          <div
            v-if="
              invitation.feedback !== null && invitation.feedback === 'ACCEPTED'
            "
            class="col-span-5"
          >
            <FormInput
              id-label="input-paper-invitation-feedback"
              :title="$t('invitationCardKind')"
              type="select"
            >
              <select
                id="input-paper-invitation-feedback"
                v-model="invitation.feedbackPaper"
                class="form-input"
                @change="paperInvitationFeedback"
              >
                <option disabled :value="null">
                  {{ $t('requestSelection') }}
                </option>
                <option value="NONE">
                  {{ $t('invitationCardKindNone') }}
                </option>
                <option value="PAPER">
                  {{ $t('invitationCardKindPaper') }}
                </option>
                <option value="DIGITAL">
                  {{ $t('invitationCardKindDigital') }}
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
            {{ $t('step2Of2') }}
          </div> -->
        </div>
      </div>
    </div>
    <ButtonList
      v-if="
        !$route.query.ic &&
        jwtDecoded &&
        event.authorUsername === jwtDecoded.username
      "
    >
      <ButtonColored append :aria-label="$t('invitations')" to="invitation">
        {{ $t('invitations') }}
        <template slot="prefix">
          <IconEnvelope />
        </template>
      </ButtonColored>
      <ButtonColored append :aria-label="$t('attendances')" to="attendance">
        {{ $t('attendances') }}
        <template slot="prefix">
          <IconUserCheck />
        </template>
      </ButtonColored>
      <ButtonColored append :aria-label="$t('settings')" to="settings">
        {{ $t('settings') }}
        <template slot="prefix">
          <IconPencil />
        </template>
      </ButtonColored>
    </ButtonList>
    <Card class="flex flex-col items-center gap-8">
      <div class="flex max-w-full flex-col items-center">
        <h1 class="mb-0 max-w-full overflow-hidden text-ellipsis">
          {{ event.name }}
        </h1>
        <Owner link :username="event.authorUsername" />
      </div>
      <div class="flex flex-col items-center gap-4 self-stretch">
        <div class="flex flex-row flex-wrap justify-center self-stretch">
          <EventDashletStart :event="event" />
          <EventDashletDuration :event="event" />
          <EventDashletVisibility :event="event" with-text />
          <EventDashletAttendanceType :event="event" />
          <EventDashletLocation :event="event" />
          <EventDashletLink :event="event" />
        </div>
        <div class="flex flex-col gap-2">
          <ButtonColored
            :aria-label="$t('iCalDownload')"
            class="text-text-bright"
            @click="downloadIcal"
          >
            {{ $t('iCalDownload') }}
            <template slot="prefix">
              <IconDownload />
            </template>
          </ButtonColored>
          <FormInputStateInfo>
            {{ $t('iCalHint') }}
          </FormInputStateInfo>
        </div>
      </div>
      <div v-if="event.description" class="flex flex-col gap-4">
        <Hr />
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="maevsi-prose-scheme"
          v-html="$domPurify.sanitize(eventDescriptionTemplate)"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </Card>
    <Modal id="ModalInvitationQrCode">
      <div v-if="invitation" class="flex flex-col items-center gap-2 pb-4">
        <QrcodeVue
          id="qrCode"
          class="bg-white p-4"
          :value="invitation.uuid"
          size="200"
        />
        <ButtonColored :aria-label="$t('print')" @click="print">
          {{ $t('print') }}
        </ButtonColored>
        <FormInputStateInfo>
          {{ $t('hintQrCode') }}
        </FormInputStateInfo>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import consola from 'consola'
import { GraphQLError } from 'graphql'
import mustache from 'mustache'
import prntr from 'prntr'
import QrcodeVue from 'qrcode.vue'
import { mapGetters } from 'vuex'

import { defineComponent } from '#app'
import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/event/eventByAuthorUsernameAndSlug.gql'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import INVITATION_UPDATE_BY_ID_MUTATION from '~/gql/mutation/invitation/invitationUpdateById.gql'
import { Event as MaevsiEvent } from '~/types/event'
import { Contact } from '~/types/contact'
import { Invitation } from '~/types/invitation'

export default defineComponent({
  name: 'IndexPage',
  components: {
    QrcodeVue,
  },
  // TODO: Either use smart query or asyncData query.
  apollo: {
    event(): any {
      return {
        query: EVENT_BY_ORGANIZER_USERNAME_AND_SLUG,
        variables: {
          authorUsername: this.$route.params.username,
          slug: this.$route.params.event_name,
          invitationUuid: this.$route.query.ic,
        },
        update: (data: any) => data.eventByAuthorUsernameAndSlug,
        error(error: any, _vm: any, _key: any, _type: any, _options: any) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  async validate({ app, params }: Context): Promise<boolean> {
    const {
      data: { eventIsExisting },
    } = await app.apolloProvider!.defaultClient.query({
      query: EVENT_IS_EXISTING_QUERY,
      variables: {
        slug: params.event_name,
        authorUsername: params.username,
      },
      fetchPolicy: 'network-only',
    })

    return eventIsExisting
  },
  transition: {
    name: 'layout',
  },
  async asyncData({ app, error, params, query }: Context) {
    let graphqlError: GraphQLError | undefined
    const event = (await app
      .apolloProvider!.defaultClient.query({
        query: EVENT_BY_ORGANIZER_USERNAME_AND_SLUG,
        variables: {
          authorUsername: params.username,
          slug: params.event_name,
          invitationUuid: query.ic,
        },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => data.eventByAuthorUsernameAndSlug)
      .catch((reason) => {
        graphqlError = reason
        consola.error(reason)
      })) as MaevsiEvent | undefined | null

    if (!event) {
      return error({ statusCode: 403 })
    }

    return { event, graphqlError }
  },
  head() {
    const title = this.title as string
    const event = this.event as MaevsiEvent
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'description',
          property: 'description',
          content: event.description!,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: event.description!,
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: event.description!,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
    }
  },
  computed: {
    ...mapGetters(['jwtDecoded', 'signedInUsername']),
    contact(): Contact | undefined {
      return this.$util.getNested(this.invitation, 'contactByContactId')
    },
    eventDescriptionTemplate(): string | undefined {
      const event = this.event as MaevsiEvent | undefined

      if (!event?.description) return

      return mustache.render(event.description, {
        contact: this.contact,
        event: this.event,
        invitation: this.invitation,
      })
    },
    invitation(): Invitation | undefined {
      const invitations = this.$util.getNested(
        this.event,
        'invitationsByEventId',
        'nodes'
      )
      const invitationsMatchingUuid =
        this.$store.getters.signedInUsername === this.$route.params.username
          ? invitations.filter(
              (invitation: Invitation) =>
                invitation.uuid === this.$route.query.ic
            )
          : invitations

      if (invitationsMatchingUuid.length > 0) {
        if (invitationsMatchingUuid.length > 1) {
          this.$swal({
            icon: 'warning',
            text: this.$t('invitationCodeMultipleWarning') as string,
            title: this.$t('globalStatusWarning'),
          })
        }

        return invitationsMatchingUuid[0]
      }

      return undefined
    },
    title(): string | undefined {
      return this.$util.getNested(this.event, 'name')
    },
  },
  methods: {
    accept() {
      if (this.invitation === undefined) {
        return
      }
      this.update(this.invitation.id, { feedback: 'ACCEPTED' })
    },
    cancel() {
      if (this.invitation === undefined) {
        return
      }
      this.update(this.invitation.id, { feedback: 'CANCELED' })
    },
    paperInvitationFeedback() {
      if (this.invitation === undefined) {
        return
      }
      const invitation = this.invitation as Invitation
      this.update(invitation.id, {
        feedbackPaper: invitation.feedbackPaper,
      })
    },
    downloadIcal() {
      const xhr = new XMLHttpRequest()
      const fileName =
        this.$route.params.username +
        '_' +
        this.$route.params.event_name +
        '.ics'

      xhr.open('POST', '/api/ical', true)
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          switch (xhr.status) {
            case 200:
              require('downloadjs')(
                new Blob([xhr.responseText]),
                fileName,
                'text/calendar'
              )
              return
            default:
              this.$swal({
                icon: 'error',
                text: this.$t('iCalUnexpectedStatusCode', {
                  statusCode: xhr.status,
                }) as string,
                title: this.$t('globalStatusError'),
              })
          }
        }
      }
      xhr.send(
        JSON.stringify({
          contact: this.contact,
          event: this.event,
          invitation: this.invitation,
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
      this.$store.commit('modalAdd', { id: 'ModalInvitationQrCode' })
    },
    update(id: string, invitationPatch: Partial<Invitation>) {
      this.$apollo
        .mutate({
          mutation: INVITATION_UPDATE_BY_ID_MUTATION,
          variables: {
            id,
            invitationPatch,
          },
        })
        .then((_value) => {
          this.$apollo.queries.event.refetch()
          this.$swal({
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            text: this.$t('success') as string,
            timerProgressBar: true,
            title: this.$t('saved'),
          })
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
    },
  },
})
</script>

<i18n lang="yml">
de:
  attendances: Check-in
  events: Veranstaltungen
  feedbackRequest: 'Bitte gib hier eine Rückmeldung, ob du teilnehmen wirst:'
  greeting: Hey{usernameString}!
  greetingDescription: Du wurdest zu folgender Veranstaltung eingeladen.
  hintQrCode: Dieses Bild ist deine Zugangsberechtigung für die Veranstaltung
  iCalDownload: Als Kalendereintrag herunterladen
  iCalHint: Die heruntergeladene Datei kann dann mit deiner Kalender-Anwendung geöffnet werden.
  iCalUnexpectedStatusCode: 'iCal-Daten konnten nicht geladen werden: Statuscode {statusCode}.'
  invitationAccept: Einladung annehmen
  invitationAcceptAdmin: Einladung für {name} annehmen
  invitationAccepted: Einladung angenommen
  invitationAcceptedAdmin: Einladung für {name} angenommen
  invitationCancel: Einladung ablehnen
  invitationCancelAdmin: Einladung für {name} ablehnen
  invitationCanceled: Einladung abgelehnt
  invitationCanceledAdmin: Einladung für {name} abgelehnt
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
  events: events
  feedbackRequest: 'Please provide feedback here whether you will be attending:'
  greeting: Hey{usernameString}!
  greetingDescription: "You've been invited to the following event."
  hintQrCode: This picture is your access authorization for the event
  iCalDownload: Download as calendar item
  iCalHint: You can open the downloaded file with your calendar app then.
  iCalUnexpectedStatusCode: 'Could not get iCal data: Status code {statusCode}.'
  invitationAccept: Accept invitation
  invitationAcceptAdmin: Accept invitation for {name}
  invitationAccepted: Invitation accepted
  invitationAcceptedAdmin: Invitation accepted for {name}
  invitationCancel: Decline invitation
  invitationCancelAdmin: Decline invitation for {name}
  invitationCanceled: Invitation declined
  invitationCanceledAdmin: Invitation declined for {name}
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
