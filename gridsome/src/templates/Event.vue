<template>
  <Layout>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <div v-if="eventContactFeedbackData.event !== null">
        <p
          class="font-bold mb-2 text-2xl"
          v-if="eventContactFeedbackData.contact !== null"
        >Hey {{eventContactFeedbackData.contact.firstName}}!</p>
        <p>You've been invited to the following event:</p>
        <div
          class="bg-white border border-gray-400 flex flex-col inline-block m-auto my-8 px-8 py-4 rounded text-black"
        >
          <h1 class="text-gray-900">{{ eventContactFeedbackData.event.name }}</h1>
          <!-- <div>
            <div title="public" v-if="event.visibility == 'PUBLIC'">
              <font-awesome class="mr-2" :icon="['fas', 'lock-open']" />public
            </div>
            <div title="private" v-if="event.visibility == 'PRIVATE'">
              <font-awesome class="mr-2" :icon="['fas', 'key']" />private
            </div>
          </div>-->
          <div class="text-gray-600">
            <font-awesome :icon="['fas', 'calendar-day']" />
            <br />
            {{eventContactFeedbackData.event.start | moment("lll")}}
            <br />
            ({{eventContactFeedbackData.event.start | moment("from")}})
          </div>
          <hr class="my-4" />
          <div class="text-gray-900 text-sm">{{eventContactFeedbackData.event.description}}</div>
          <div class="text-white">
            <button
              class="btn btn-green"
              v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback === null || eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'CANCELED'"
              @click="accept"
            >Accept</button>
            <button
              class="btn btn-red"
              v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback === null || eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'ACCEPTED'"
              @click="cancel"
            >Cancel</button>
          </div>
          <div
            v-if="eventContactFeedbackData.invitationFeedbackData.invitationFeedback !== null && eventContactFeedbackData.invitationFeedbackData.invitationFeedback == 'ACCEPTED'"
          >
            <label class="form-label md:text-right mb-1 md:mb-0" for="input-username">Kind of invite</label>
            <select
              class="form-input"
              v-model="eventContactFeedbackData.invitationFeedbackData.paperInvitationFeedback"
              @change="send"
            >
              <option value="NONE">none</option>
              <option value="PAPER">paper</option>
              <option value="DIGITAL">digital</option>
            </select>
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
import Error404 from "~/components/Error404.vue";
import gql from "graphql-tag";

export default {
  apollo: {
    $prefetch: false,
    eventContactFeedbackData() {
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
                eMailAddress
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
      };
    }
  },
  components: {
    Error404
  },
  data() {
    return {
      eventContactFeedbackData: null
    };
  },
  metaInfo() {
    return {
      title:
        this.eventContactFeedbackData !== null &&
        this.eventContactFeedbackData.event.name !== null
          ? this.eventContactFeedbackData.event.name
          : "404"
    };
  },
  methods: {
    accept() {
      this.eventContactFeedbackData.invitationFeedbackData.invitationFeedback =
        "ACCEPTED";
      this.send();
    },
    cancel() {
      this.eventContactFeedbackData.invitationFeedbackData.invitationFeedback =
        "CANCELED";
      this.send();
    },
    send() {
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
          if (data.data.updateInvitationFeedbackDatumById.invitationFeedbackDatum !== null) {
            this.eventContactFeedbackData.invitationFeedbackData = data.data.updateInvitationFeedbackDatumById.invitationFeedbackDatum
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    removeTypename(object) {
      let objectClone = JSON.parse(JSON.stringify(object));
      delete objectClone.__typename;
      return objectClone;
    }
  }
};
</script>