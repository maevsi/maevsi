<template>
  <Loader :error-message="graphqlErrorMessage" :loading="$apollo.loading">
    <h2 v-if="username" class="text-left truncate">
      {{ $t('titleEvents', { username: $route.params.username }) }}
    </h2>
    <div class="flex flex-wrap justify-center">
      <ButtonEventList v-if="showButtonEventList" class="mx-2" />
      <ButtonEventNew v-if="showButtonEventNew" class="mx-2" />
      <ButtonRedeem v-if="showButtonRedeem" class="mx-2" />
    </div>
    <ul
      v-if="
        allEvents !== undefined && allEvents.nodes && allEvents.nodes.length
      "
      class="text-left"
    >
      <li
        v-for="event in allEvents.nodes"
        :key="event.id"
        class="mb-2 last:mb-0"
        :class="{
          'opacity-75': $moment(event.start).isBefore($moment()),
        }"
      >
        <nuxt-link
          class="bg-white border border-gray-300 flex flex-col p-4 rounded"
          :class="{
            'bg-yellow-100':
              $store.state.jwtDecoded &&
              event.organizerUsername === $store.state.jwtDecoded.username,
          }"
          :to="
            localePath('/event/' + event.organizerUsername + '/' + event.slug)
          "
        >
          <div
            :class="{ 'opacity-75': $moment(event.start).isBefore($moment()) }"
          >
            <div class="flex items-center mb-2 text-text-dark text-sm">
              <div
                class="font-medium truncate"
                :class="{
                  'text-green-700': $moment(event.start).isSameOrAfter(
                    $moment()
                  ),
                }"
              >
                {{ $moment(event.start).format('lll') }}
              </div>
            </div>
            <div class="flex items-center mb-2 text-text-dark text-sm">
              <EventIcon :event="event" :show-text="false" />
              <div class="flex items-baseline">
                <div class="font-bold mx-2 text-xl truncate">
                  {{ event.name }}
                </div>
                <Owner :username="event.organizerUsername" />
              </div>
            </div>
            <p
              v-if="event.description"
              class="line-clamp-box line-clamp-2 text-text-dark"
            >
              {{ $htmlToText($md.render(event.description)) }}
            </p>
          </div>
        </nuxt-link>
      </li>
      <div v-if="allEvents.pageInfo.hasNextPage" class="flex justify-center">
        <Button :icon="false" @click.native="showMore">{{
          $t('globalPagingMore')
        }}</Button>
      </div>
    </ul>
    <p v-else>{{ $t('noEvents') }}</p>
  </Loader>
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
    showButtonEventNew: {
      type: Boolean,
      default: true,
    },
    showButtonEventList: {
      type: Boolean,
      default() {
        return this.$route.name.replace(/___.+$/, '') !== 'event'
      },
    },
    showButtonRedeem: {
      type: Boolean,
      default: true,
    },
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
}
</script>

<i18n lang="yml">
de:
  createEvent: 'Veranstaltung erstellen'
  eventOrganizer: 'von {username}'
  noEvents: 'Aktuell gibt es keine Veranstaltungen 😕'
  titleEvents: 'Veranstaltungen von {username}'
en:
  createEvent: 'Create event'
  eventOrganizer: 'by {username}'
  noEvents: 'There are currently no events 😕'
  titleEvents: 'Events by {username}'
</i18n>
