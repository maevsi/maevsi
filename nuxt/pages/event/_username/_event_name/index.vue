<template>
  <Loader
    v-if="($apollo.loading && !event) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <div
      v-if="
        !$route.query.ic &&
        jwtDecoded &&
        event.authorUsername === jwtDecoded.username
      "
      class="flex justify-evenly"
    >
      <ButtonColored
        append
        :aria-label="$t('invitations')"
        :icon-id="['fas', 'envelope']"
        to="invitation"
      >
        {{ $t('invitations') }}
      </ButtonColored>
      <ButtonColored
        append
        :aria-label="$t('attendances')"
        :icon-id="['fas', 'user-check']"
        to="attendance"
      >
        {{ $t('attendances') }}
      </ButtonColored>
      <ButtonColored
        append
        :aria-label="$t('settings')"
        :icon-id="['fas', 'cog']"
        to="settings"
      >
        {{ $t('settings') }}
      </ButtonColored>
    </div>
    <CardInfo v-if="$route.query.ic && contact">
      {{ $t('invitationViewFor', { name: $util.getContactName(contact) }) }}
      <ButtonColored
        append
        :aria-label="$t('invitationSelectionClear')"
        :icon-id="['fas', 'times']"
        @click="
          $router.push({
            append: true,
            path: 'invitation',
            query: { ...$route.query, ic: undefined },
          })
        "
      >
        {{ $t('invitationSelectionClear') }}
      </ButtonColored>
    </CardInfo>
    <br />
    <div v-if="contact" class="text-center">
      <p class="font-bold mb-2 text-2xl">
        {{
          $t('greeting', {
            usernameString: $util.getContactName(contact)
              ? ' ' + $util.getContactName(contact)
              : '',
          })
        }}
      </p>
      <p>{{ $t('greetingDescription') }}</p>
    </div>
    <!-- :class="{ -->
    <!-- 'bg-yellow-100': -->
    <!-- !$route.query.ic && -->
    <!-- jwtDecoded && -->
    <!-- event.authorUsername === jwtDecoded.username, -->
    <!-- }" -->
    <Card class="flex flex-col items-center mt-4">
      <h1 class="mb-0 truncate max-w-full">
        {{ event.name }}
      </h1>
      <Owner class="mb-4" link :username="event.authorUsername" />
      <div class="flex flex-col sm:flex-row m-auto">
        <EventDashletVisibility :event="event" with-text />
        <EventDashletStart :event="event" />
        <EventDashletDuration :event="event" />
        <EventDashletLocation :event="event" />
        <EventDashletAttendanceType :event="event" />
      </div>
      <div class="flex gap-4 justify-center">
        <ButtonColored
          :aria-label="$t('qrCodeShow')"
          :icon-id="['fas', 'qrcode']"
          class="text-text-bright"
          @click="qrCodeShow"
        >
          {{ $t('qrCodeShow') }}
        </ButtonColored>
        <ButtonColored
          :aria-label="$t('iCalDownload')"
          :icon-id="['fas', 'download']"
          class="text-text-bright"
          @click="downloadIcal"
        >
          {{ $t('iCalDownload') }}
        </ButtonColored>
      </div>
      <div v-if="invitation">
        <hr class="my-4" />
        <div class="grid grid-cols-6 justify-content-center">
          <div
            class="text-text-bright m-2"
            :class="{
              'col-span-5': invitation.feedback === 'ACCEPTED',
              'col-span-6':
                invitation.feedback === null ||
                invitation.feedback === 'CANCELED',
            }"
          >
            <div class="flex gap-4 justify-center">
              <div
                v-if="invitation.feedback === 'CANCELED'"
                class="flex font-semibold items-center text-red-600"
              >
                <FontAwesomeIcon
                  class="mr-2"
                  :icon="['fas', 'times-circle']"
                  size="lg"
                  title="canceled"
                />
                {{ $t('invitationCanceled') }}
              </div>
              <ButtonColored
                v-if="
                  invitation.feedback === null ||
                  invitation.feedback === 'CANCELED'
                "
                :aria-label="$t('invitationAccept')"
                @click="accept"
              >
                {{ $t('invitationAccept') }}
              </ButtonColored>
              <div
                v-if="invitation.feedback === 'ACCEPTED'"
                class="flex font-semibold items-center text-green-600"
              >
                <FontAwesomeIcon
                  class="mr-2"
                  :icon="['fas', 'check-circle']"
                  size="lg"
                  title="accepted"
                />
                {{ $t('invitationAccepted') }}
              </div>
              <ButtonColored
                v-if="
                  invitation.feedback === null ||
                  invitation.feedback === 'ACCEPTED'
                "
                :aria-label="$t('invitationCancel')"
                @click="cancel"
              >
                {{ $t('invitationCancel') }}
              </ButtonColored>
            </div>
          </div>
          <div
            v-if="invitation.feedback === 'ACCEPTED'"
            class="col-span-1 bg-gray-500 m-auto px-2 rounded-full text-text-bright"
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
              label-for="input-paper-invitation-feedback"
              :title="$t('invitationCardKind')"
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
            class="col-span-1 bg-gray-500 m-auto px-2 rounded-full text-text-bright"
          >
            {{ $t('step2Of2') }}
          </div>
        </div>
      </div>
      <div v-if="event.description">
        <hr class="my-4" />
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="maevsi-prose-scheme"
          v-html="$domPurify.sanitize(eventDescriptionTemplate)"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </Card>
    <Modal id="ModalInvitationQrCode">
      <div class="flex justify-center">
        <QrcodeVue
          class="bg-white p-4"
          :value="
            invitation
              ? invitation.uuid
              : '00000000-0000-0000-0000-000000000000'
          "
          size="200"
        />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import consola from 'consola'
import { GraphQLError } from 'graphql'
import mustache from 'mustache'
import QrcodeVue from 'qrcode.vue'
import { mapGetters } from 'vuex'

import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/event/eventByAuthorUsernameAndSlug.gql'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import INVITATION_UPDATE_BY_ID_MUTATION from '~/gql/mutation/invitation/invitationUpdateById.gql'
import { Event as MaevsiEvent } from '~/types/event'
import { Contact } from '~/types/contact'
import { Invitation } from '~/types/invitation'

import { defineComponent } from '#app'

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
    })

    return eventIsExisting
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
    ...mapGetters(['jwtDecoded']),
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
  attendances: Anwesenheiten
  greeting: Hey{usernameString}!
  greetingDescription: 'Du wurdest zu folgender Veranstaltung eingeladen:'
  iCalDownload: Zum Kalender hinzufügen
  iCalUnexpectedStatusCode: 'iCal-Daten konnten nicht geladen werden: Statuscode {statusCode}.'
  invitationAccept: Einladung annehmen
  invitationAccepted: Einladung angenommen
  invitationCancel: Einladung ablehnen
  invitationCanceled: Einladung abgelehnt
  invitationCardKind: Art der Einladungskarte
  invitationCardKindNone: Keine
  invitationCardKindPaper: Papier
  invitationCardKindDigital: Digital
  invitationCodeMultipleWarning: Es wurden mehrere Einladungscodes für dieselbe Veranstaltung eingelöst! Diese Seite zeigt die Daten des zuerst gefundenen an.
  invitationSelectionClear: Auswahl der Einladung löschen
  invitationViewFor: Du schaust dir die Einladung für {name} an.
  invitations: Einladungen
  qrCodeShow: QR-Code anzeigen
  requestSelection: Bitte auswählen
  saved: Gespeichert!
  settings: Einstellungen
  step1Of2: 1/2
  step2Of2: 2/2
  success: Deine Eingabe wurde erfolgreich gespeichert.
en:
  attendances: Attendances
  greeting: Hey{usernameString}!
  greetingDescription: "You've been invited to the following event:"
  iCalDownload: Add to calendar
  iCalUnexpectedStatusCode: 'Could not get iCal data: Status code {statusCode}.'
  invitationAccept: Accept invitation
  invitationAccepted: Invitation accepted
  invitationCancel: Cancel invitation
  invitationCanceled: Invitation canceled
  invitationCardKind: Kind of invitation card
  invitationCardKindNone: None
  invitationCardKindPaper: Paper
  invitationCardKindDigital: Digital
  invitationCodeMultipleWarning: Multiple invitation codes were redeemed for the same event! This page shows data for the first code found.
  invitationSelectionClear: Clear invitation selection
  invitationViewFor: You're viewing the invitation for {name}.
  invitations: Invitations
  qrCodeShow: Show qr code
  requestSelection: Please select
  saved: Saved!
  settings: Settings
  step1Of2: 1/2
  step2Of2: 2/2
  success: Your input was saved succesfully.
</i18n>
