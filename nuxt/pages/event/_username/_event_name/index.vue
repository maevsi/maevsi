<template>
  <Loader
    :graphql-error-message="graphqlErrorMessage"
    :loading="$apollo.loading"
  >
    <div v-if="$global.checkNested(eventContactFeedbackData, 'event')">
      <div v-if="eventContactFeedbackData.contact">
        <p class="font-bold mb-2 text-2xl">
          {{
            $t('greeting', {
              usernameString: $global.checkNested(
                eventContactFeedbackData,
                'contact',
                'firstName'
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
          @click="downloadIcal"
        >
          {{ $t('iCalDownload') }}
        </Button>
        <div v-if="eventContactFeedbackData.invitationFeedbackData !== null">
          <hr class="my-4" />
          <div class="grid grid-cols-6 justify-content-center text-gray-600">
            <div
              class="text-white m-2"
              :class="{
                'col-span-5':
                  eventContactFeedbackData.invitationFeedbackData
                    .invitationFeedback === 'ACCEPTED',
                'col-span-6':
                  eventContactFeedbackData.invitationFeedbackData
                    .invitationFeedback === null ||
                  eventContactFeedbackData.invitationFeedbackData
                    .invitationFeedback === 'CANCELED',
              }"
            >
              <div class="flex justify-center">
                <div
                  v-if="
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback === 'CANCELED'
                  "
                  class="flex font-semibold items-center text-red-600"
                >
                  <FontAwesomeIcon
                    class="mr-2"
                    :icon="['fas', 'times-circle']"
                    size="lg"
                    title="canceled"
                  />
                  {{ $t('inviteCanceled') }}
                </div>
                <ButtonGreen
                  v-if="
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback === null ||
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback === 'CANCELED'
                  "
                  class="mx-2"
                  :icon="false"
                  @click.native="accept"
                >
                  {{ $t('inviteAccept') }}
                </ButtonGreen>
                <div
                  v-if="
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback === 'ACCEPTED'
                  "
                  class="flex font-semibold items-center text-green-600"
                >
                  <FontAwesomeIcon
                    class="mr-2"
                    :icon="['fas', 'check-circle']"
                    size="lg"
                    title="accepted"
                  />
                  {{ $t('inviteAccepted') }}
                </div>
                <Button
                  v-if="
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback === null ||
                    eventContactFeedbackData.invitationFeedbackData
                      .invitationFeedback === 'ACCEPTED'
                  "
                  class="mx-2"
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
                  .invitationFeedback === 'ACCEPTED'
              "
              class="col-span-1 bg-gray-500 m-auto px-2 rounded-full text-white"
            >
              1/2
            </div>
            <div
              v-if="
                eventContactFeedbackData.invitationFeedbackData
                  .invitationFeedback !== null &&
                eventContactFeedbackData.invitationFeedbackData
                  .invitationFeedback === 'ACCEPTED'
              "
              class="col-span-5"
            >
              <FormInput
                label-for="input-paper-invitation-feedback"
                :title="$t('inviteCardKind')"
              >
                <select
                  id="input-paper-invitation-feedback"
                  v-model="
                    eventContactFeedbackData.invitationFeedbackData
                      .paperInvitationFeedback
                  "
                  class="form-input"
                  @change="paperInvitationFeedback"
                >
                  <option disabled :value="null">
                    {{ $t('requestSelection') }}
                  </option>
                  <option value="NONE">{{ $t('inviteCardKindNone') }}</option>
                  <option value="PAPER">{{ $t('inviteCardKindPaper') }}</option>
                  <option value="DIGITAL">
                    {{ $t('inviteCardKindDigital') }}
                  </option>
                </select>
              </FormInput>
            </div>
            <div
              v-if="
                eventContactFeedbackData.invitationFeedbackData
                  .invitationFeedback !== null &&
                eventContactFeedbackData.invitationFeedbackData
                  .invitationFeedback === 'ACCEPTED'
              "
              class="col-span-1 bg-gray-500 m-auto px-2 rounded-full text-white"
            >
              2/2
            </div>
          </div>
        </div>
        <div v-if="eventContactFeedbackData.event.description">
          <hr class="my-4" />
          <!-- Do not insert other characters (newlines) in vue-markdown's body! -->
          <vue-markdown
            :anchor-attributes="{ rel: 'nofollow noopener noreferrer' }"
            class="description prose text-left text-gray-900"
            >{{ eventContactFeedbackData.event.description }}
          </vue-markdown>
        </div>
        <img
          :alt="$t('ornament')"
          class="m-auto mt-2 opacity-25 md:w-3/4 xl:w-1/2"
          src="~/assets/ornament.png"
        />
      </div>
    </div>
    <div v-else>
      <Error :status-code="404" />
    </div>
    <Modal v-if="showModalSuccess" @close="showModalSuccess = false">
      {{ $t('success') }}
    </Modal>
  </Loader>
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
  validate({ app, params }) {
    return (
      app.$global.REGEX_SLUG.test(params.event_name) &&
      app.$global.REGEX_SLUG.test(params.username)
    )
  },
  data() {
    return {
      eventContactFeedbackData: undefined,
      eventContactFeedbackDataToSend: undefined,
      graphqlErrorMessage: undefined,
      showModalSuccess: false,
    }
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
    paperInvitationFeedback() {
      this.eventContactFeedbackDataToSend = this.$global.objectClone(
        this.eventContactFeedbackData
      )
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
        .then((_data) => {
          this.showModalSuccess = true
        })
        .catch((error) => {
          alert(error.message)
          consola.error(error)
        })
    },
  },
}
</script>

<i18n lang="yml">
de:
  greeting: 'Hey{usernameString}!'
  greetingDescription: 'Du wurdest zu folgender Veranstaltung eingeladen:'
  iCalDownload: 'Zum Kalender hinzufügen'
  iCalUnexpectedStatusCode: 'Fehler: Statuscode {statusCode}. iCal-Daten konnten nicht geladen werden.'
  inviteAccept: 'Einladung annehmen'
  inviteAccepted: 'Einladung angenommen'
  inviteCancel: 'Einladung ablehnen'
  inviteCanceled: 'Einladung abgelehnt'
  inviteCardKind: 'Art der Einladungskarte'
  inviteCardKindNone: 'Keine'
  inviteCardKindPaper: 'Papier'
  inviteCardKindDigital: 'Digital'
  ornament: 'Ornament'
  requestSelection: 'Bitte auswählen'
  settings: 'Einstellungen'
  success: 'Deine Eingabe wurde erfolgreich gespeichert.'
en:
  greeting: 'Hey{usernameString}!'
  greetingDescription: "You've been invited to the following event:"
  iCalDownload: 'Add to calendar'
  iCalUnexpectedStatusCode: 'Error: Status code {statusCode}. Could not get iCal data.'
  inviteAccept: 'Accept invite'
  inviteAccepted: 'Invite accepted'
  inviteCancel: 'Cancel invite'
  inviteCanceled: 'Invite canceled'
  inviteCardKind: 'Kind of invite card'
  inviteCardKindNone: 'None'
  inviteCardKindPaper: 'Paper'
  inviteCardKindDigital: 'Digital'
  ornament: 'Ornament'
  requestSelection: 'Please select'
  settings: 'Settings'
  success: 'Your input was saved succesfully.'
</i18n>
