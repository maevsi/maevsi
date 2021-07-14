<template>
  <Loader
    v-if="($apollo.loading && !event) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <div
      v-if="
        !$route.query.ic &&
        $store.state.jwtDecoded &&
        event.authorUsername === $store.state.jwtDecoded.username
      "
      class="flex justify-evenly"
    >
      <Button
        append
        :aria-label="$t('settings')"
        :icon-id="['fas', 'cog']"
        to="settings"
      >
        {{ $t('settings') }}
      </Button>
    </div>
    <CardInfo v-if="$route.query.ic">
      {{ $t('invitationViewFor', { name: $global.getContactName(contact) }) }}
      <Button
        append
        :aria-label="$t('invitationSelectionClear')"
        :icon-id="['fas', 'times']"
        @click="
          $router.push({
            append: true,
            path: 'settings',
            query: { ...$route.query, ic: undefined },
          })
        "
      >
        {{ $t('invitationSelectionClear') }}
      </Button>
    </CardInfo>
    <br />
    <div v-if="contact" class="text-center">
      <p class="font-bold mb-2 text-2xl">
        {{
          $t('greeting', {
            usernameString: $global.getContactName(contact)
              ? ' ' + $global.getContactName(contact)
              : '',
          })
        }}
      </p>
      <p>{{ $t('greetingDescription') }}</p>
    </div>
    <div
      class="card flex flex-col items-center mt-4"
      :class="{
        'bg-yellow-100':
          !$route.query.ic &&
          $store.state.jwtDecoded &&
          event.authorUsername === $store.state.jwtDecoded.username,
      }"
    >
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
      <Button
        :aria-label="$t('iCalDownload')"
        :icon-id="['fas', 'download']"
        class="text-text-bright"
        @click="downloadIcal"
      >
        {{ $t('iCalDownload') }}
      </Button>
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
              <ButtonGreen
                v-if="
                  invitation.feedback === null ||
                  invitation.feedback === 'CANCELED'
                "
                :aria-label="$t('invitationAccept')"
                @click="accept"
              >
                {{ $t('invitationAccept') }}
              </ButtonGreen>
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
              <Button
                v-if="
                  invitation.feedback === null ||
                  invitation.feedback === 'ACCEPTED'
                "
                :aria-label="$t('invitationCancel')"
                @click="cancel"
              >
                {{ $t('invitationCancel') }}
              </Button>
            </div>
          </div>
          <div
            v-if="invitation.feedback === 'ACCEPTED'"
            class="
              col-span-1
              bg-gray-500
              m-auto
              px-2
              rounded-full
              text-text-bright
            "
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
            class="
              col-span-1
              bg-gray-500
              m-auto
              px-2
              rounded-full
              text-text-bright
            "
          >
            {{ $t('step2Of2') }}
          </div>
        </div>
      </div>
      <div v-if="event.description">
        <hr class="my-4" />
        <!-- Do not insert other characters (newlines) in vue-markdown's body! -->
        <vue-markdown
          :anchor-attributes="{ rel: 'nofollow noopener noreferrer' }"
          class="description maevsi-prose"
          :html="false"
          >{{ event.description }}
        </vue-markdown>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown-konishi'

import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/event/eventByAuthorUsernameAndSlug.gql'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import INVITATION_UPDATE_BY_ID_MUTATION from '~/gql/mutation/invitation/invitationUpdateById.gql'

const consola = require('consola')

export default {
  // TODO: Either use smart query or asyncData query.
  apollo: {
    event() {
      return {
        query: EVENT_BY_ORGANIZER_USERNAME_AND_SLUG,
        variables: {
          authorUsername: this.$route.params.username,
          slug: this.$route.params.event_name,
          invitationUuid: this.$route.query.ic,
        },
        update: (data) => data.eventByAuthorUsernameAndSlug,
        error(error, _vm, _key, _type, _options) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  components: {
    VueMarkdown,
  },
  async validate({ app, params }) {
    const {
      data: { eventIsExisting },
    } = await app.apolloProvider.defaultClient.query({
      query: EVENT_IS_EXISTING_QUERY,
      variables: {
        slug: params.event_name,
        authorUsername: params.username,
      },
    })

    return eventIsExisting
  },
  async asyncData({ $global, app, error, params, query }) {
    let graphqlError
    const event = await app.apolloProvider.defaultClient
      .query({
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
      })

    if (!event) {
      return error({ statusCode: 403 })
    }

    const invitations = $global.getNested(
      event,
      'invitationsByEventId',
      'nodes'
    )

    return { event, graphqlError, invitations }
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
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
          content: this.event?.description,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.event?.description,
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: this.event?.description,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: this.title,
        },
      ],
      title: this.title,
    }
  },
  computed: {
    contact() {
      return this.$global.getNested(this.invitation, 'contactByContactId')
    },
    invitation() {
      const invitations = this.$global.getNested(
        this.event,
        'invitationsByEventId',
        'nodes'
      )
      const invitationsMatchingUuid =
        this.$store.state.signedInUsername === this.$route.params.username
          ? invitations.filter(
              (invitation) => invitation.uuid === this.$route.query.ic
            )
          : invitations

      if (invitationsMatchingUuid.length === 0) {
        return undefined
      } else if (invitationsMatchingUuid.length === 1) {
        return invitationsMatchingUuid[0]
      } else {
        consola.error(
          'An unexpected amount of matching invitation codes have been found!'
        )
      }

      return undefined
    },
    title() {
      return this.$global.getNested(this.event, 'name')
    },
  },
  methods: {
    accept() {
      this.update(this.invitation.id, { feedback: 'ACCEPTED' })
    },
    cancel() {
      this.update(this.invitation.id, { feedback: 'CANCELED' })
    },
    paperInvitationFeedback() {
      this.update(this.invitation.id, {
        feedbackPaper: this.invitation.feedbackPaper,
      })
    },
    downloadIcal() {
      const xhr = new XMLHttpRequest()
      const fileName =
        this.$route.params.username +
        '_' +
        this.$route.params.event_name +
        '.ics'

      xhr.open('POST', '/ical', true)
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
              this.$store.commit('modalAdd', {
                contentBody: this.$t('iCalUnexpectedStatusCode', {
                  statusCode: xhr.status,
                }),
              })
          }
        }
      }
      xhr.send(JSON.stringify({ event: this.event }))
    },
    update(id, invitationPatch) {
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
          this.$store.commit('modalAdd', {
            contentBody: this.$t('success'),
          })
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
    },
  },
}
</script>

<i18n lang="yml">
de:
  greeting: Hey{usernameString}!
  greetingDescription: 'Du wurdest zu folgender Veranstaltung eingeladen:'
  iCalDownload: Zum Kalender hinzufügen
  iCalUnexpectedStatusCode: 'Fehler: Statuscode {statusCode}. iCal-Daten konnten nicht geladen werden.'
  invitationAccept: Einladung annehmen
  invitationAccepted: Einladung angenommen
  invitationCancel: Einladung ablehnen
  invitationCanceled: Einladung abgelehnt
  invitationCardKind: Art der Einladungskarte
  invitationCardKindNone: Keine
  invitationCardKindPaper: Papier
  invitationCardKindDigital: Digital
  invitationSelectionClear: Auswahl der Einladung löschen
  invitationViewFor: Du schaust dir die Einladung für {name} an.
  requestSelection: Bitte auswählen
  settings: Einstellungen
  step1Of2: 1/2
  step2Of2: 2/2
  success: Deine Eingabe wurde erfolgreich gespeichert.
en:
  greeting: Hey{usernameString}!
  greetingDescription: "You've been invited to the following event:"
  iCalDownload: Add to calendar
  iCalUnexpectedStatusCode: 'Error: Status code {statusCode}. Could not get iCal data.'
  invitationAccept: Accept invitation
  invitationAccepted: Invitation accepted
  invitationCancel: Cancel invitation
  invitationCanceled: Invitation canceled
  invitationCardKind: Kind of invitation card
  invitationCardKindNone: None
  invitationCardKindPaper: Paper
  invitationCardKindDigital: Digital
  invitationSelectionClear: Clear invitation selection
  invitationViewFor: You're viewing the invitation for {name}.
  requestSelection: Please select
  settings: Settings
  step1Of2: 1/2
  step2Of2: 2/2
  success: Your input was saved succesfully.
</i18n>
