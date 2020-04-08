<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <AlertGraphql
      v-else-if="graphqlErrorMessage !== null"
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="undefined"
    />
    <EventList
      v-else
      :events="allEvents"
    />
  </Layout>
</template>

<script>
import AlertGraphql from '~/components/AlertGraphql.vue'
import EventList from '~/components/EventList.vue'
import gql from 'graphql-tag'

export default {
  components: {
    AlertGraphql,
    EventList
  },
  data () {
    return {
      allEvents: null,
      graphqlErrorMessage: null
    }
  },
  metaInfo () {
    return { title: 'Events' }
  },
  apollo: {
    $prefetch: false,
    allEvents: {
      query: gql`
        query eventsPage ($cursor: Cursor) {
          allEvents (first: 10, after: $cursor) {
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
        cursor: null
      },
      error (error, vm, key, type, options) {
        this.graphqlErrorMessage = error.message
      }
    }
  },
  methods: {
    showMore () {
      this.$apollo.queries.allEvents.fetchMore({
        variables: {
          cursor: this.allEvents.pageInfo.endCursor
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newNodes = fetchMoreResult.allEvents.nodes
          const pageInfo = fetchMoreResult.allEvents.pageInfo

          return {
            allEvents: {
              __typename: previousResult.allEvents.__typename,
              nodes: [...previousResult.allEvents.nodes, ...newNodes],
              pageInfo
            }
          }
        }
      })
    }
  }
}
</script>
