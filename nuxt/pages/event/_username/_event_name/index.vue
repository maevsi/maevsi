<template>
  <Loader
    v-if="($apollo.loading && !event) || graphqlErrorMessage"
    :error-message="graphqlErrorMessage"
  />
  <div v-else>
    <div v-if="event">
      <div v-if="contact" class="text-center">
        <p class="font-bold mb-2 text-2xl">
          {{
            $t('greeting', {
              usernameString: contact.firstName ? ' ' + contact.firstName : '',
            })
          }}
        </p>
        <p>{{ $t('greetingDescription') }}</p>
      </div>
      <div
        v-if="
          $store.state.jwtDecoded &&
          event.organizerUsername === $store.state.jwtDecoded.username
        "
        class="flex justify-evenly"
      >
        <Button append :icon-id="['fas', 'cog']" to="settings">
          {{ $t('settings') }}
        </Button>
      </div>
      <div
        class="card flex flex-col items-center mt-4"
        :class="{
          'bg-yellow-100':
            $store.state.jwtDecoded &&
            event.organizerUsername === $store.state.jwtDecoded.username,
        }"
      >
        <h1 class="mb-0">
          {{ event.name }}
        </h1>
        <Owner class="mb-4" link :username="event.organizerUsername" />
        <div class="flex flex-col sm:flex-row m-auto">
          <EventDashletVisibility :event="event" with-text />
          <EventDashletStart :event="event" />
          <EventDashletDuration :event="event" />
          <EventDashletLocation :event="event" />
          <EventDashletAttendanceType :event="event" />
        </div>
        <Button
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
              <div class="flex justify-center">
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
                  class="mx-2"
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
                  class="mx-2"
                  @click="cancel"
                >
                  {{ $t('invitationCancel') }}
                </Button>
              </div>
            </div>
            <div
              v-if="invitation.feedback === 'ACCEPTED'"
              class="col-span-1 bg-gray-500 m-auto px-2 rounded-full text-text-bright"
            >
              1/2
            </div>
            <div
              v-if="
                invitation.feedback !== null &&
                invitation.feedback === 'ACCEPTED'
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
                invitation.feedback !== null &&
                invitation.feedback === 'ACCEPTED'
              "
              class="col-span-1 bg-gray-500 m-auto px-2 rounded-full text-text-bright"
            >
              2/2
            </div>
          </div>
        </div>
        <div v-if="event.description">
          <hr class="my-4" />
          <!-- Do not insert other characters (newlines) in vue-markdown's body! -->
          <vue-markdown
            :anchor-attributes="{ rel: 'nofollow noopener noreferrer' }"
            class="description maevsi-prose"
            >{{ event.description }}
          </vue-markdown>
        </div>
      </div>
    </div>
    <div v-else>
      <Error :status-code="403" />
    </div>
    <Modal ref="modal">
      {{ $t('success') }}
    </Modal>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown-konishi'

import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/eventByOrganizerUsernameAndSlug'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/eventIsExisting'
import UPDATE_INVITATION_BY_ID_MUTATION from '~/gql/mutation/updateInvitationById'

const consola = require('consola')

export default {
  apollo: {
    event() {
      return {
        query: EVENT_BY_ORGANIZER_USERNAME_AND_SLUG,
        variables: {
          organizerUsername: this.$route.params.username,
          slug: this.$route.params.event_name,
        },
        update: (data) => data.eventByOrganizerUsernameAndSlug,
        error(error, _vm, _key, _type, _options) {
          this.graphqlErrorMessage = error.message
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
        organizerUsername: params.username,
      },
    })

    return eventIsExisting
  },
  data() {
    return {
      graphqlErrorMessage: undefined,
    }
  },
  head() {
    return {
      title: this.$global.getNested(this.event, 'name') || '403',
      meta: [
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
      ],
    }
  },
  computed: {
    contact() {
      return this.$global.getNested(this.invitation, 'contactByContactId')
    },
    invitation() {
      return this.$global.getNested(
        this.event,
        'invitationsByEventId',
        'nodes',
        0
      )
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
              alert(
                this.$t('iCalUnexpectedStatusCode', {
                  statusCode: xhr.status,
                })
              )
          }
        }
      }
      xhr.send(JSON.stringify({ event: this.event }))
    },
    update(id, invitationPatch) {
      this.$apollo
        .mutate({
          mutation: UPDATE_INVITATION_BY_ID_MUTATION,
          variables: {
            id,
            invitationPatch,
          },
        })
        .then((_data) => {
          this.$apollo.queries.event.refetch()
          this.$refs.modal.isVisible = true
        })
        .catch((error) => {
          this.graphqlErrorMessage = error.message
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
  invitationAccept: 'Einladung annehmen'
  invitationAccepted: 'Einladung angenommen'
  invitationCancel: 'Einladung ablehnen'
  invitationCanceled: 'Einladung abgelehnt'
  invitationCardKind: 'Art der Einladungskarte'
  invitationCardKindNone: 'Keine'
  invitationCardKindPaper: 'Papier'
  invitationCardKindDigital: 'Digital'
  requestSelection: 'Bitte auswählen'
  settings: 'Einstellungen'
  success: 'Deine Eingabe wurde erfolgreich gespeichert.'
en:
  greeting: 'Hey{usernameString}!'
  greetingDescription: "You've been invited to the following event:"
  iCalDownload: 'Add to calendar'
  iCalUnexpectedStatusCode: 'Error: Status code {statusCode}. Could not get iCal data.'
  invitationAccept: 'Accept invitation'
  invitationAccepted: 'Invitation accepted'
  invitationCancel: 'Cancel invitation'
  invitationCanceled: 'Invitation canceled'
  invitationCardKind: 'Kind of invitation card'
  invitationCardKindNone: 'None'
  invitationCardKindPaper: 'Paper'
  invitationCardKindDigital: 'Digital'
  requestSelection: 'Please select'
  settings: 'Settings'
  success: 'Your input was saved succesfully.'
</i18n>
