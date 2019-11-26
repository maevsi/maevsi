<template>
  <Layout>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else>
      <div v-if="event !== null">
        <h1>{{ event.name }} ({{ event.visibility }})</h1>
        <div>{{event.timestamp | moment("lll")}}</div>
        <div>{{event.interval | duration('humanize')}}</div>
      </div>
      <div v-else>
        404 - Not Found
      </div>
    </div>
  </Layout>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      event: null
    };
  },
  metaInfo() {
    return { title: this.$route.params.event_name };
  },
  apollo: {
    event() {
      return {
        query: gql`query event($organizerUsername: String!, $slug: String!) {
          eventByOrganizerUsernameAndSlug(organizerUsername: $organizerUsername, slug: $slug) {
            name
            slug
            visibility
            organizerUsername
            place
            timestamp
          }
        }`,
        variables: {
          organizerUsername: this.$route.params.account_name,
          slug: this.$route.params.event_name
        },
        update: data => data.eventByOrganizerUsernameAndSlug
      }
    }
  }
};
</script>