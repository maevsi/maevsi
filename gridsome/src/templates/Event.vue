<template>
  <Layout>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <div v-if="event !== null">
        <h1>{{ event.name }} ({{ event.visibility }})</h1>
        <div>{{event.start | moment("from")}}</div>
        <div>{{event.start | moment("lll")}}</div>
        <div>{{event.end | moment("lll")}}</div>
        <div>{{event.end | moment("diff", event.start) | duration('humanize')}}</div>
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
    event() {
      return {
        query: gql`
          query event($organizerUsername: String!, $slug: String!) {
            eventByOrganizerUsernameAndSlug(
              organizerUsername: $organizerUsername
              slug: $slug
            ) {
              name
              slug
              visibility
              organizerUsername
              place
              start
              end
            }
          }
        `,
        variables: {
          organizerUsername: this.$route.params.account_name,
          slug: this.$route.params.event_name
        },
        update: data => data.eventByOrganizerUsernameAndSlug
      };
    }
  },
  components: {
    Error404
  },
  data() {
    return {
      event: null
    };
  },
  metaInfo() {
    return {
      title:
        this.event !== null && this.event.name !== null
          ? this.event.name
          : "404"
    };
  }
};
</script>