<template>
  <Layout>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else>
      <div v-if="eventContactFeedbackData.event !== null">
        <p
          v-if="eventContactFeedbackData.contact !== null"
          class="font-bold mb-2 text-2xl"
        >
          Hey{{ eventContactFeedbackData.contact.firstName !== null ? ' ' + eventContactFeedbackData.contact.firstName : '' }}!
        </p>
        <p>You've been invited to the following event:</p>
        <div class="bg-white border border-gray-400 flex flex-col inline-block m-auto my-8 px-8 py-4 rounded text-black">
          <h1 class="text-gray-900">
            {{ eventContactFeedbackData.event.name }}
          </h1>
          <div class="event-meta">
            <div>
              <div
                v-if="eventContactFeedbackData.event.visibility == 'PUBLIC'"
                title="public"
              >
                <font-awesome :icon="['fas', 'lock-open']" />
                <br>public
              </div>
              <div
                v-if="eventContactFeedbackData.event.visibility == 'PRIVATE'"
                title="private"
              >
                <font-awesome :icon="['fas', 'key']" />
                <br>private
              </div>
            </div>
            <div>
              <font-awesome :icon="['fas', 'calendar-day']" />
              <br>
              {{ eventContactFeedbackData.event.start | moment("lll") }}
              <br>
              ({{ eventContactFeedbackData.event.start | moment("from") }})
            </div>
            <div v-if="eventContactFeedbackData.event.place !== null">
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
          <hr class="my-4">
          <!-- Do not insert other characters (newlines) in vue-markdown's body! -->
          <vue-markdown class="description text-left text-gray-900 text-sm">{{ eventContactFeedbackData.event.description }}</vue-markdown>
          <div v-if="eventContactFeedbackData.invitationFeedbackData !== null">
            <div class="text-white">
              <button
                v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback === null || eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'CANCELED'"
                class="btn btn-green"
                @click="accept"
              >
                Accept Invite
              </button>
              <button
                v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback === null || eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'ACCEPTED'"
                class="btn btn-red"
                @click="cancel"
              >
                Cancel Invite
              </button>
            </div>
            <div v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback !== null && eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'ACCEPTED'">
              <label
                class="form-label mb-1 md:mb-0 pr-0"
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
        <!-- <div v-if="event.end !== null">
          <div>{{event.end | moment("lll")}}</div>
          <div>{{event.end | moment("diff", event.start) | duration('humanize')}}</div>
        </div>-->
      </div>
      <div v-else>
        <Error404 />
      </div>
    </div>
  </Layout>
</template>

<script>
import VueMarkdown from 'vue-markdown-v2'
import Error404 from '~/components/Error404.vue'
import gql from 'graphql-tag'

export default {
  apollo: {
    $prefetch: false,
    eventContactFeedbackData () {
      return {
        query: gql`
          query($organizerUsername: String!, $slug: String!) {
            eventContactFeedbackData(
              _organizerUsername: $organizerUsername
              _slug: $slug
            ) {
              event {
                id
                name
                slug
                visibility
                organizerUsername
                description
                place
                start
                end
                archived
              }
              contact {
                id
                firstName
                lastName
                address
                emailAddress
              }
              invitationFeedbackData {
                id
                invitationFeedback
                paperInvitationFeedback
              }
            }
          }
        `,
        variables: {
          organizerUsername: this.$route.params.account_name,
          slug: this.$route.params.event_name
        },
        update: data => data.eventContactFeedbackData
      }
    }
  },
  components: {
    Error404,
    VueMarkdown
  },
  data () {
    return {
      eventContactFeedbackData: null
    }
  },
  metaInfo () {
    return {
      title:
        this.eventContactFeedbackData !== null &&
          this.eventContactFeedbackData.event.name !== null
          ? this.eventContactFeedbackData.event.name
          : '404'
    }
  },
  methods: {
    accept () {
      this.eventContactFeedbackData.invitationFeedbackData.invitationFeedback =
        'ACCEPTED'
      this.send()
    },
    cancel () {
      this.eventContactFeedbackData.invitationFeedbackData.invitationFeedback =
        'CANCELED'
      this.send()
    },
    send () {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation(
              $id: Int!
              $invitationFeedbackDatumPatch: InvitationFeedbackDatumPatch!
            ) {
              updateInvitationFeedbackDatumById(
                input: {
                  id: $id
                  invitationFeedbackDatumPatch: $invitationFeedbackDatumPatch
                }
              ) {
                invitationFeedbackDatum {
                  id
                  invitationFeedback
                  paperInvitationFeedback
                }
              }
            }
          `,
          variables: {
            id: this.eventContactFeedbackData.invitationFeedbackData.id,
            invitationFeedbackDatumPatch: this.removeTypename(
              this.eventContactFeedbackData.invitationFeedbackData
            )
          }
        })
        .then(data => {
          if (
            data.data.updateInvitationFeedbackDatumById
              .invitationFeedbackDatum !== null
          ) {
            this.eventContactFeedbackData.invitationFeedbackData =
              data.data.updateInvitationFeedbackDatumById.invitationFeedbackDatum
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    removeTypename (object) {
      const objectClone = JSON.parse(JSON.stringify(object))
      delete objectClone.__typename
      return objectClone
    }
  }
}
</script>
