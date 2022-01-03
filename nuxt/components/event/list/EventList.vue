<template>
  <Loader
    v-if="($apollo.loading && !allEvents) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
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
        <ButtonColored
          :aria-label="$t('globalPagingMore')"
          @click="$util.loadMore($apollo, 'allEvents', allEvents)"
        >
          {{ $t('globalPagingMore') }}
        </ButtonColored>
      </div>
    </ul>
    <p v-else class="text-center">{{ $t('noEvents') }}</p>
  </div>
</template>

<script lang="ts">
import consola from 'consola'

import { defineComponent, PropType } from '#app'
import EVENTS_ALL_QUERY from '~/gql/query/event/eventsAll.gql'

export default defineComponent({
  apollo: {
    allEvents(): any {
      return {
        query: EVENTS_ALL_QUERY,
        variables: {
          authorUsername: this.username,
          first: this.$util.ITEMS_PER_PAGE,
          offset: null,
        },
        error(error: any, _vm: any, _key: any, _type: any, _options: any) {
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
        return this.$route?.name?.replace(/___.+$/, '') !== 'event'
      },
      type: Boolean,
    },
    showButtonEventUnlock: {
      default: true,
      type: Boolean,
    },
    username: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
  data() {
    return {
      graphqlError: undefined as any,
    }
  },
})
</script>

<i18n lang="yml">
de:
  createEvent: Veranstaltung erstellen
  eventAuthor: von {username}
  noEvents: Aktuell gibt es keine Veranstaltungen 😕
en:
  createEvent: Create event
  eventAuthor: by {username}
  noEvents: There are currently no events 😕
</i18n>
