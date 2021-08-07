<template>
  <Loader
    v-if="($apollo.loading && !allEvents) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <h2 v-if="username" class="text-left truncate">
      {{ $t('titleEvents', { username: $route.params.username }) }}
    </h2>
    <ButtonList>
      <ButtonEventList v-if="showButtonEventList" />
      <ButtonEventNew v-if="showButtonEventNew" />
      <ButtonEventUnlock v-if="showButtonEventUnlock" />
    </ButtonList>
    <ul
      v-if="
        allEvents !== undefined && allEvents.nodes && allEvents.nodes.length
      "
      class="text-left"
    >
      <EventListItem
        v-for="event in allEvents.nodes"
        :key="event.id"
        :event="event"
      />
      <div v-if="allEvents.pageInfo.hasNextPage" class="flex justify-center">
        <Button :aria-label="$t('globalPagingMore')" @click="showMore">
          {{ $t('globalPagingMore') }}
        </Button>
      </div>
    </ul>
    <p v-else class="text-center">{{ $t('noEvents') }}</p>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import EVENTS_ALL_QUERY from '~/gql/query/event/eventsAll.gql'

const consola = require('consola')

export default defineComponent({
  apollo: {
    allEvents() {
      return {
        query: EVENTS_ALL_QUERY,
        variables: {
          cursor: null,
          limit: this.$global.ITEMS_PER_PAGE,
          authorUsername: this.username,
        },
        error(error, _vm, _key, _type, _options) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  props: {
    showButtonEventNew: {
      default: true,
      type: Boolean,
    },
    showButtonEventList: {
      default() {
        return this.$route.name.replace(/___.+$/, '') !== 'event'
      },
      type: Boolean,
    },
    showButtonEventUnlock: {
      default: true,
      type: Boolean,
    },
    username: {
      default: undefined,
      type: String,
    },
  },
  data() {
    return {
      graphqlError: undefined,
    }
  },
  methods: {
    showMore() {
      this.$apollo.queries.allEvents.fetchMore({
        variables: {
          cursor: this.allEvents.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }

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
})
</script>

<i18n lang="yml">
de:
  createEvent: Veranstaltung erstellen
  eventAuthor: von {username}
  noEvents: Aktuell gibt es keine Veranstaltungen 😕
  titleEvents: Veranstaltungen von {username}
en:
  createEvent: Create event
  eventAuthor: by {username}
  noEvents: There are currently no events 😕
  titleEvents: Events by {username}
</i18n>
