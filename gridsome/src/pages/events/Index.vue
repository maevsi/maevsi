<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div
      v-else
      class="m-auto w-full"
    >
      <ul
        v-if="allEvents.nodes && allEvents.nodes.length"
        class="mx-4 text-left"
      >
        <g-link
          v-for="event in allEvents.nodes"
          :key="event.id"
          :to="'/events/' + event.organizerUsername + '/' + event.slug"
        >
          <li class="mb-4">
            <div class="bg-white border border-gray-400 flex flex-col p-4 rounded">
              <div class="flex items-center mb-2 text-gray-600 text-sm">
                <div
                  class="font-medium"
                  :class="{
                    'text-gray-600': $moment(event.start).isBefore($moment()),
                    'text-teal-600': $moment(event.start).isSameOrAfter($moment())
                  }"
                >
                  {{ event.start | moment("lll") }}
                </div>
              </div>
              <div class="flex items-center mb-2 text-gray-600 text-sm">
                <font-awesome
                  v-if="event.visibility == 'PUBLIC'"
                  class="mr-2"
                  :icon="['fas', 'globe-africa']"
                  title="public"
                />
                <font-awesome
                  v-if="event.visibility == 'PRIVATE'"
                  class="mr-2"
                  :icon="['fas', 'key']"
                  title="private"
                />
                <div
                  class="font-bold text-xl"
                  :class="{
                    'text-gray-600': $moment(event.start).isBefore($moment()),
                    'text-gray-900': $moment(event.start).isSameOrAfter($moment())
                  }"
                >
                  {{ event.name }}
                </div>
              </div>
              <p class="oneliner text-gray-700">
                {{ event.description }}
              </p>
            </div>
          </li>
        </g-link>
        <div
          v-if="allEvents.pageInfo.hasNextPage"
          class="flex justify-center"
        >
          <button
            class="btn btn-red"
            @click="showMore"
          >
            More
          </button>
        </div>
      </ul>
      <p v-else>
        There are currently no events :/
      </p>
    </div>
  </Layout>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      allEvents: null
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
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `,
      variables: {
        cursor: null
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
