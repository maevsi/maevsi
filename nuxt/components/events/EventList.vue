<template>
  <div>
    <AlertGraphql
      v-if="graphqlErrorMessage !== undefined"
      :graphql-error-message="graphqlErrorMessage"
    />
    <div v-else-if="$apollo.loading">{{ $t('globalApolloLoading') }}</div>
    <ul
      v-else-if="
        allEvents !== undefined && allEvents.nodes && allEvents.nodes.length
      "
      class="text-left"
    >
      <h2 v-if="username" class="text-left truncate">
        {{ $t('titleEvents', { username: this.$route.params.username }) }}
      </h2>
      <nuxt-link
        v-for="event in allEvents.nodes"
        :key="event.id"
        :to="localePath('/event/' + event.organizerUsername + '/' + event.slug)"
      >
        <li class="mb-2">
          <div
            class="bg-white border border-gray-400 flex flex-col p-4 rounded"
          >
            <div class="flex items-center mb-2 text-gray-600 text-sm">
              <div
                class="font-medium truncate"
                :class="{
                  'text-gray-600': $moment(event.start).isBefore($moment()),
                  'text-teal-600': $moment(event.start).isSameOrAfter(
                    $moment()
                  ),
                }"
              >
                {{ $moment(event.start).format('lll') }}
              </div>
            </div>
            <div class="flex items-center mb-2 text-gray-600 text-sm">
              <EventIcon class="mr-2" :event="event" :show-text="false" />
              <div
                class="font-bold text-xl truncate"
                :class="{
                  'text-gray-600': $moment(event.start).isBefore($moment()),
                  'text-gray-900': $moment(event.start).isSameOrAfter(
                    $moment()
                  ),
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
      </nuxt-link>
      <div v-if="allEvents.pageInfo.hasNextPage" class="flex justify-center">
        <Button :icon="false" @click.native="showMore">{{
          $t('globalPagingMore')
        }}</Button>
      </div>
    </ul>
    <p v-else>{{ $t('noEvents') }}</p>
  </div>
</template>

<script>
import ALL_EVENTS_QUERY from '~/gql/query/allEvents'

export default {
  apollo: {
    allEvents() {
      return {
        query: ALL_EVENTS_QUERY,
        variables: {
          cursor: null,
          limit: this.$global.ITEMS_PER_PAGE,
          username: this.username,
        },
        error(error, _vm, _key, _type, _options) {
          this.graphqlErrorMessage = error.message
        },
      }
    },
  },
  props: {
    username: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      graphqlErrorMessage: undefined,
    }
  },
  methods: {
    showMore() {
      this.$apollo.queries.allEvents.fetchMore({
        variables: {
          cursor: this.allEvents.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newNodes = fetchMoreResult.allEvents.nodes
          const pageInfo = fetchMoreResult.allEvents.pageInfo

          return {
            allEvents: {
              __typename: previousResult.allEvents.__typename,
              nodes: [...previousResult.allEvents.nodes, ...newNodes],
              pageInfo,
            },
          }
        },
      })
    },
  },
}
</script>

<i18n lang="yml">
de:
  noEvents: 'Aktuell gibt es keine Veranstaltungen :/'
  titleEvents: 'Veranstaltungen von {username}'
en:
  noEvents: 'There are currently no events :/'
  titleEvents: 'Events by {username}'
</i18n>
