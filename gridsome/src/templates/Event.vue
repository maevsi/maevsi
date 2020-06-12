<template>
  <Layout>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else-if="graphqlErrorMessage !== undefined">
      <AlertGraphql
        :graphql-error-message="graphqlErrorMessage"
        :validation-object="undefined"
      />
    </div>
    <div v-else>
      <div v-if="$checkNested(eventContactFeedbackData, 'event')">
        <p class="font-bold mb-2 text-2xl">
          Hey{{ $checkNested(eventContactFeedbackData, 'contact', 'firstname') ? ' ' + eventContactFeedbackData.contact.firstName : '' }}!
        </p>
        <p>You've been invited to the following event:</p>
        <div class="bg-white border border-gray-400 flex flex-col inline-block m-auto my-8 px-8 py-4 rounded text-black">
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
              <font-awesome :icon="['fas', 'calendar-day']" />
              <br>
              {{ eventContactFeedbackData.event.start | moment("lll") }}
              <br>
              ({{ eventContactFeedbackData.event.start | moment("from") }})
            </div>
            <div
              v-if="eventContactFeedbackData.event.end !== null"
              class="my-2 sm:mx-4"
            >
              <font-awesome :icon="['fas', 'hourglass']" />
              <br>
              {{ eventContactFeedbackData.event.end | moment("diff", eventContactFeedbackData.event.start) | duration('humanize') }}
            </div>
            <div
              v-if="eventContactFeedbackData.event.place !== null"
              class="my-2 sm:mx-4"
            >
              <font-awesome :icon="['fas', 'map-marker']" />
              <br>
              <a
                :href="'https://maps.google.de/?q=' + eventContactFeedbackData.event.place"
                target="_blank"
              >
                {{ eventContactFeedbackData.event.place }}
                <font-awesome :icon="['fas', 'external-link-alt']" />
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
          <hr class="my-4">
          <!-- Do not insert other characters (newlines) in vue-markdown's body! -->
          <vue-markdown class="description text-left text-gray-900 text-sm">{{ eventContactFeedbackData.event.description }}</vue-markdown>
          <hr class="my-4">
          <div v-if="eventContactFeedbackData.invitationFeedbackData !== null">
            <div class="text-white">
              <ButtonGreen
                v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback === null || eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'CANCELED'"
                :icon="false"
                @click.native="accept"
              >
                Accept Invite
              </ButtonGreen>
              <div class="flex justify-center">
                <div
                  v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback === null || eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'ACCEPTED'"
                  class="flex font-semibold items-center text-green-600"
                >
                  <font-awesome
                    class="mr-2 text-green-600"
                    :icon="['fas', 'check-circle']"
                    size="lg"
                    title="accepted"
                  /> Accepted
                </div>
                <Button
                  v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback === null || eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'ACCEPTED'"
                  :icon="false"
                  @click.native="cancel"
                >
                  Cancel Invite
                </Button>
              </div>
            </div>
            <div v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback !== null && eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'ACCEPTED'">
              <label
                class="mb-1 md:mb-0 pr-0"
                for="input-username"
              >Kind of invite</label>
              <select
                v-model="eventContactFeedbackData.invitationFeedbackData.paperInvitationFeedback"
                class="form-input"
                @change="send"
              >
                <option
                  disabled
                  :value="null"
                >
                  Please select
                </option>
                <option value="NONE">
                  None
                </option>
                <option value="PAPER">
                  Paper
                </option>
                <option value="DIGITAL">
                  Digital
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <Error404 />
      </div>
    </div>
  </Layout>
</template>

<script>
import { EVENT_CONTACT_FEEDBACK_DATA_QUERY, UPDATE_INVITATION_FEEDBACK_DATUM_BY_ID_MUTATION } from '~/apollo/documents'
import AlertGraphql from '~/components/AlertGraphql.vue'
import Button from '~/components/buttons/Button.vue'
import ButtonGreen from '~/components/buttons/ButtonGreen.vue'
import Error404 from '~/components/Error404.vue'
import EventIcon from '~/components/EventIcon.vue'

import VueMarkdown from 'vue-markdown-konishi'

export default {
  apollo: {
    eventContactFeedbackData () {
      return {
        query: EVENT_CONTACT_FEEDBACK_DATA_QUERY,
        variables: {
          organizerUsername: this.$route.params.username,
          slug: this.$route.params.event_name
        },
        update: data => data.eventContactFeedbackData,
        error (error, vm, key, type, options) {
          this.graphqlErrorMessage = error.message
        }
      }
    }
  },
  components: {
    AlertGraphql,
    Button,
    ButtonGreen,
    Error404,
    EventIcon,
    VueMarkdown
  },
  data () {
    return {
      eventContactFeedbackData: undefined,
      eventContactFeedbackDataToSend: undefined,
      graphqlErrorMessage: undefined
    }
  },
  metaInfo () {
    return {
      title:
        (this.eventContactFeedbackData !== undefined &&
          this.eventContactFeedbackData.event !== null &&
          this.eventContactFeedbackData.event.name !== null)
          ? this.eventContactFeedbackData.event.name
          : '404'
    }
  },
  methods: {
    accept () {
      this.eventContactFeedbackDataToSend = this.$objectClone(this.eventContactFeedbackData)
      this.eventContactFeedbackDataToSend.invitationFeedbackData.invitationFeedback = 'ACCEPTED'
      this.send()
    },
    cancel () {
      this.eventContactFeedbackDataToSend = this.$objectClone(this.eventContactFeedbackData)
      this.eventContactFeedbackDataToSend.invitationFeedbackData.invitationFeedback = 'CANCELED'
      this.send()
    },
    downloadIcal () {
      const xhr = new XMLHttpRequest()
      const fileName = this.$route.params.username + '_' + this.$route.params.event_name + '.ics'

      xhr.open('POST', '/ical', true)
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          require('downloadjs')(this.responseText, fileName, 'text/calendar')
        }
      }
      xhr.send(JSON.stringify({ event: this.eventContactFeedbackData.event }))
    },
    send () {
      this.$apollo.mutate({
        mutation: UPDATE_INVITATION_FEEDBACK_DATUM_BY_ID_MUTATION,
        variables: {
          id: this.eventContactFeedbackDataToSend.invitationFeedbackData.id,
          invitationFeedbackDatumPatch: this.$removeTypename(
            this.eventContactFeedbackDataToSend.invitationFeedbackData
          )
        }
      })
        .catch(error => {
          alert(error.message)
          console.error(error)
        })
    }
  }
}
</script>
