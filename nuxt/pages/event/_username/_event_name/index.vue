<template>
  <div>
    <div v-if="$apollo.loading">{{ $t('globalApolloLoading') }}</div>
    <AlertGraphql
      v-else-if="graphqlErrorMessage !== undefined"
      :graphql-error-message="graphqlErrorMessage"
    />
    <div v-else>
      <div v-if="$global.checkNested(eventContactFeedbackData, 'event')">
        <div v-if="eventContactFeedbackData.contact">
          <p class="font-bold mb-2 text-2xl">
            {{
              $t('greeting', {
                usernameString: $global.checkNested(
                  eventContactFeedbackData,
                  'contact',
                  'firstname'
                )
                  ? ' ' + eventContactFeedbackData.contact.firstName
                  : '',
              })
            }}
          </p>
          <p>{{ $t('greetingDescription') }}</p>
        </div>
        <div
          v-if="
            $store.state.jwtDecoded &&
            eventContactFeedbackData.event.organizerUsername ===
              $store.state.jwtDecoded.username
          "
        >
          <Button append :icon-id="['fas', 'cog']" link="settings">
            {{ $t('settings') }}
          </Button>
        </div>
        <div
          class="bg-white border border-gray-400 flex flex-col inline-block m-auto my-8 px-8 py-4 rounded text-black"
          :class="{
            'bg-yellow-100':
              $store.state.jwtDecoded &&
              eventContactFeedbackData.event.organizerUsername ===
                $store.state.jwtDecoded.username,
          }"
        >
          <h1 class="mb-0">
            {{ eventContactFeedbackData.event.name }}
          </h1>
          <Owner
            class="mb-4"
            link
            :username="eventContactFeedbackData.event.organizerUsername"
          />
          <div class="flex flex-col sm:flex-row m-auto text-gray-600">
            <EventIcon
              :event="eventContactFeedbackData.event"
              :with-text="true"
              class="my-2 sm:mx-4"
            />
            <div class="my-2 sm:mx-4">
              <FontAwesomeIcon :icon="['fas', 'calendar-day']" />
              <br />
              {{ $moment(eventContactFeedbackData.event.start).format('lll') }}
              <br />
              ({{ $moment(eventContactFeedbackData.event.start).fromNow() }})
            </div>
            <div
              v-if="eventContactFeedbackData.event.end !== null"
              class="my-2 sm:mx-4"
            >
              <FontAwesomeIcon :icon="['fas', 'hourglass']" />
              <br />
              {{
                $moment
                  .duration(
                    $moment(eventContactFeedbackData.event.end).diff(
                      $moment(eventContactFeedbackData.event.start)
                    )
                  )
                  .humanize()
              }}
            </div>
            <div
              v-if="eventContactFeedbackData.event.place !== null"
              class="my-2 sm:mx-4"
            >
              <FontAwesomeIcon :icon="['fas', 'map-marker']" />
              <br />
              <a
                :href="
                  'https://maps.google.de/?q=' +
                  encodeURIComponent(eventContactFeedbackData.event.place)
                "
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                {{ eventContactFeedbackData.event.place }}
              </a>
            </div>
          </div>
          <Button
            :icon-id="['fas', 'download']"
            class="my-2 text-white"
            @click.native="downloadIcal"
          >
            {{ $t('iCalDownload') }}
          </Button>
          <div v-if="eventContactFeedbackData.event.description">
            <hr class="my-4" />
            <!-- Do not insert other characters (newlines) in vue-markdown's body! -->
            <vue-markdown
              :anchor-attributes="{ rel: 'nofollow noopener noreferrer' }"
              class="description text-left text-gray-900"
              >{{ eventContactFeedbackData.event.description }}
            </vue-markdown>
          </div>
          <hr class="my-4" />
          <div v-if="eventContactFeedbackData.invitationFeedbackData !== null">
            <div class="text-white mb-4">
              <ButtonGreen
                v-if="
                  eventContactFeedbackData.invitationFeedbackData
                    .invitationFeedback === null ||
                  eventContactFeedbackData.invitationFeedbackData
                    .invitationFeedback == 'CANCELED'
                "
                :icon="false"
                @click.native="accept"
              >
                {{ $t('inviteAccept') }}
              </ButtonGreen>
              <div class="flex justify-center">
                <div
                  v-if="
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback === null ||
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback == 'ACCEPTED'
                  "
                  class="flex font-semibold items-center text-green-600"
                >
                  <FontAwesomeIcon
                    class="mr-2 text-green-600"
                    :icon="['fas', 'check-circle']"
                    size="lg"
                    title="accepted"
                  />
                  {{ $t('inviteAccepted') }}
                </div>
                <div class="mx-2" />
                <Button
                  v-if="
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback === null ||
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback == 'ACCEPTED'
                  "
                  :icon="false"
                  @click.native="cancel"
                >
                  {{ $t('inviteCancel') }}
                </Button>
              </div>
            </div>
            <div
              v-if="
                eventContactFeedbackData.invitationFeedbackData
                  .invitationFeedback !== null &&
                eventContactFeedbackData.invitationFeedbackData
                  .invitationFeedback == 'ACCEPTED'
              "
            >
              <label
                class="mb-1 md:mb-0 pr-0"
                for="input-paper-invitation-feedback"
                >{{ $t('inviteKind') }}</label
              >
              <select
                id="input-paper-invitation-feedback"
                v-model="
                  eventContactFeedbackData.invitationFeedbackData
                    .paperInvitationFeedback
                "
                class="form-input"
                @change="send"
              >
                <option disabled :value="null">
                  {{ $t('requestSelection') }}
                </option>
                <option value="NONE">{{ $t('inviteKindNone') }}</option>
                <option value="PAPER">{{ $t('inviteKindPaper') }}</option>
                <option value="DIGITAL">{{ $t('inviteKindDigital') }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <Error :status-code="404" />
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown-konishi'

import EVENT_CONTACT_FEEDBACK_DATA_QUERY from '~/gql/query/eventContactFeedbackData'
import UPDATE_INVITATION_FEEDBACK_DATUM_BY_ID_MUTATION from '~/gql/mutation/updateInvitationFeedbackDatumById'

const consola = require('consola')

export default {
  apollo: {
    eventContactFeedbackData() {
      return {
        query: EVENT_CONTACT_FEEDBACK_DATA_QUERY,
        variables: {
          organizerUsername: this.$route.params.username,
          slug: this.$route.params.event_name,
        },
        update: (data) => data.eventContactFeedbackData,
        error(error, _vm, _key, _type, _options) {
          this.graphqlErrorMessage = error.message
        },
      }
    },
  },
  components: {
    VueMarkdown,
  },
  data() {
    return {
      eventContactFeedbackData: undefined,
      eventContactFeedbackDataToSend: undefined,
      graphqlErrorMessage: undefined,
    }
  },
  methods: {
    accept() {
      this.eventContactFeedbackDataToSend = this.$global.objectClone(
        this.eventContactFeedbackData
      )
      this.eventContactFeedbackDataToSend.invitationFeedbackData.invitationFeedback =
        'ACCEPTED'
      this.send()
    },
    cancel() {
      this.eventContactFeedbackDataToSend = this.$global.objectClone(
        this.eventContactFeedbackData
      )
      this.eventContactFeedbackDataToSend.invitationFeedbackData.invitationFeedback =
        'CANCELED'
      this.send()
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
              alert(
                this.$t('iCalUnexpectedStatusCode', {
                  statusCode: xhr.status,
                })
              )
          }
        }
      }
      xhr.send(JSON.stringify({ event: this.eventContactFeedbackData.event }))
    },
    send() {
      this.$apollo
        .mutate({
          mutation: UPDATE_INVITATION_FEEDBACK_DATUM_BY_ID_MUTATION,
          variables: {
            id: this.eventContactFeedbackDataToSend.invitationFeedbackData.id,
            invitationFeedbackDatumPatch: this.$global.removeTypename(
              this.eventContactFeedbackDataToSend.invitationFeedbackData
            ),
          },
        })
        .catch((error) => {
          alert(error.message)
          consola.error(error)
        })
    },
  },
  head() {
    return {
      title:
        this.eventContactFeedbackData !== undefined &&
        this.eventContactFeedbackData.event !== null &&
        this.eventContactFeedbackData.event.name !== null
          ? this.eventContactFeedbackData.event.name
          : '404',
      meta: [
        {
          hid: 'description',
          property: 'description',
          content: this.eventContactFeedbackData?.event?.description,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.eventContactFeedbackData?.event?.description,
        },
      ],
    }
  },
  validate({ params }) {
    // Must be a number
    return /^[-A-Za-z0-9]+$/.test(params.id)
  },
}
</script>

<i18n lang="yml">
de:
  greeting: 'Hey{usernameString}!'
  greetingDescription: 'Du wurdest zu folgender Veranstaltung eingeladen:'
  iCalDownload: 'Als iCal herunterladen'
  iCalUnexpectedStatusCode: 'Fehler: Statuscode {statusCode}. iCal-Daten konnten nicht geladen werden.'
  inviteAccept: 'Einladung annehmen'
  inviteAccepted: 'Einladung angenommen'
  inviteCancel: 'Einladung ablehnen'
  inviteKind: 'Art der Einladung'
  inviteKindNone: 'Keine'
  inviteKindPaper: 'Papier'
  inviteKindDigital: 'Digital'
  requestSelection: 'Bitte auswählen'
  settings: 'Einstellungen'
en:
  greeting: 'Hey{usernameString}!'
  greetingDescription: "You've been invited to the following event:"
  iCalDownload: 'Download as iCal'
  iCalUnexpectedStatusCode: 'Error: Status code {statusCode}. Could not get iCal data.'
  inviteAccept: 'Accept invite'
  inviteAccepted: 'Invite accepted'
  inviteCancel: 'Cancel invite'
  inviteKind: 'Kind of invite'
  inviteKindNone: 'None'
  inviteKindPaper: 'Paper'
  inviteKindDigital: 'Digital'
  requestSelection: 'Please select'
  settings: 'Settings'
</i18n>
