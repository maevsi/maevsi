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
      <div v-if="allEvents === null">
        <Error404 />
      </div>
      <div v-else>
        <h1>{{ $route.params.username }}</h1>
        <h2 class="text-left">
          Their Events
        </h2>
        <EventList
          :apollo="$apollo"
          :all-events="allEvents"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import AlertGraphql from '~/components/AlertGraphql.vue'
import Error404 from '~/components/Error404.vue'
import EventList from '~/components/EventList.vue'
import gql from 'graphql-tag'

export default {
  apollo: {
    allEvents () {
      return {
        query: gql`
          query eventsPage ($username: String!, $limit: Int!, $cursor: Cursor) {
            allEvents (condition: {organizerUsername: $username}, first: $limit, after: $cursor) {
              nodes {
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
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `,
        variables: {
          cursor: null,
          limit: this.ITEMS_PER_PAGE,
          username: this.$route.params.username
        },
        error (error, vm, key, type, options) {
          this.graphqlErrorMessage = error.message
        }
      }
    }
  },
  components: {
    AlertGraphql,
    Error404,
    EventList
  },
  data () {
    return {
      graphqlErrorMessage: undefined
    }
  },
  metaInfo () {
    return { title: this.$route.params.username }
  }
}
</script>
