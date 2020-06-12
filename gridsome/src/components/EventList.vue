<template>
  <div>
    <AlertGraphql
      v-if="graphqlErrorMessage !== undefined"
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="undefined"
    />
    <div class="m-auto w-full">
      <ul
        v-if="allEvents !== undefined && allEvents.nodes && allEvents.nodes.length"
        class="text-left"
      >
        <g-link
          v-for="event in allEvents.nodes"
          :key="event.id"
          :to="'/event/' + event.organizerUsername + '/' + event.slug"
        >
          <li class="mb-2">
            <div class="bg-white border border-gray-400 flex flex-col p-4 rounded">
              <div class="flex items-center mb-2 text-gray-600 text-sm">
                <div
                  class="font-medium truncate"
                  :class="{
                    'text-gray-600': $moment(event.start).isBefore($moment()),
                    'text-teal-600': $moment(event.start).isSameOrAfter($moment())
                  }"
                >
                  {{ event.start | moment("lll") }}
                </div>
              </div>
              <div class="flex items-center mb-2 text-gray-600 text-sm">
                <EventIcon
                  class="mr-2"
                  :event="event"
                  :show-text="false"
                />
                <div
                  class="font-bold text-xl truncate"
                  :class="{
                    'text-gray-600': $moment(event.start).isBefore($moment()),
                    'text-gray-900': $moment(event.start).isSameOrAfter($moment())
                  }"
                >
                  {{ event.name }}
                </div>
              </div>
              <p class="line-clamp-box line-clamp-2 text-gray-700">
                {{ event.description }}
              </p>
            </div>
          </li>
        </g-link>
        <div
          v-if="allEvents.pageInfo.hasNextPage"
          class="flex justify-center"
        >
          <Button
            :icon="false"
            @click.native="showMore"
          >
            More
          </Button>
        </div>
      </ul>
      <p v-else>
        There are currently no events :/
      </p>
    </div>
  </div>
</template>

<script>
import { ALL_EVENTS_QUERY } from '~/apollo/documents'
import AlertGraphql from '~/components/AlertGraphql.vue'
import Button from '~/components/buttons/Button.vue'
import EventIcon from '~/components/EventIcon.vue'

export default {
  apollo: {
    allEvents () {
      return {
        query: ALL_EVENTS_QUERY,
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
    Button,
    EventIcon
  },
  props: {
    username: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      graphqlErrorMessage: undefined
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
