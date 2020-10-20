<template>
  <div>
    <div v-if="$apollo.loading">Loading...</div>
    <AlertGraphql
      v-else-if="graphqlErrorMessage !== undefined"
      :graphql-error-message="graphqlErrorMessage"
    />
    <div v-else>
      <div v-if="$global.checkNested(eventContactFeedbackData, 'event')">
        <p class="font-bold mb-2 text-2xl">
          Hey{{
            $global.checkNested(
              eventContactFeedbackData,
              'contact',
              'firstname'
            )
              ? ' ' + eventContactFeedbackData.contact.firstName
              : ''
          }}!
        </p>
        <p>You've been invited to the following event:</p>
        <div
          class="bg-white border border-gray-400 flex flex-col inline-block m-auto my-8 px-8 py-4 rounded text-black"
        >
          <h1>
            {{ eventContactFeedbackData.event.name }}
          </h1>
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
                  eventContactFeedbackData.event.place
                "
                rel="noopener"
                target="_blank"
              >
                {{ eventContactFeedbackData.event.place }}
                <FontAwesomeIcon :icon="['fas', 'external-link-alt']" />
              </a>
            </div>
          </div>
          <Button
            :icon-id="['fas', 'download']"
            class="my-2 text-white"
            @click.native="downloadIcal"
          >
            Download as iCal
          </Button>
          <div v-if="eventContactFeedbackData.event.description">
            <hr class="my-4" />
            <!-- Do not insert other characters (newlines) in vue-markdown's body! -->
            <vue-markdown class="description text-left text-gray-900 text-sm">{{
              eventContactFeedbackData.event.description
            }}</vue-markdown>
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
                Accept invite
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
                  Accepted
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
                  Cancel invite
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
                >Kind of invite</label
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
                <option disabled :value="null">Please select</option>
                <option value="NONE">None</option>
                <option value="PAPER">Paper</option>
                <option value="DIGITAL">Digital</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <Error404 />
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown-konishi'

import EVENT_CONTACT_FEEDBACK_DATA_QUERY from '~/gql/query/eventContactFeedbackData'
import UPDATE_INVITATION_FEEDBACK_DATUM_BY_ID_MUTATION from '~/gql/mutation/updateInvitationFeedbackDatumById'

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
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          require('downloadjs')(this.responseText, fileName, 'text/calendar')
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
          console.error(error)
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
    }
  },
  validate({ params }) {
    // Must be a number
    return /^[-A-Za-z0-9]+$/.test(params.id)
  },
}
</script>
