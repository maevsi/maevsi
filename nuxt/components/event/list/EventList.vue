<template>
  <Loader
    v-if="($apollo.loading && !allEvents) || graphqlError"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
  />
  <div v-else class="flex flex-col gap-4">
    <div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
      <ButtonList>
        <ButtonEventList v-if="showButtonEventList" />
        <ButtonEventNew v-if="showButtonEventNew" />
      </ButtonList>
      <div class="flex gap-4">
        <div class="flex gap-1">
          <EventIconVisibility visibility="PUBLIC" />
          <span>{{ $t('legendSeparator') }}</span>
          <span>{{ $t('public') }}</span>
        </div>
        <div class="flex gap-1">
          <EventIconVisibility visibility="PRIVATE" />
          <span>{{ $t('legendSeparator') }}</span>
          <span>{{ $t('private') }}</span>
        </div>
      </div>
    </div>
    <ul
      v-if="
        allEvents !== undefined && allEvents.nodes && allEvents.nodes.length
      "
    >
      <EventListItem
        v-for="event in allEvents.nodes"
        :key="event.id"
        :event="event"
      />
      <div v-if="allEvents.pageInfo.hasNextPage" class="flex justify-center">
        <ButtonColored
          :aria-label="$t('globalShowMore')"
          @click="$util.loadMore($apollo, 'allEvents', allEvents)"
        >
          {{ $t('globalShowMore') }}
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
    username: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
  data() {
    return {
      graphqlError: undefined as Error | undefined,
    }
  },
})
</script>

<i18n lang="yml">
de:
  createEvent: Veranstaltung erstellen
  eventAuthor: von {username}
  legendSeparator: '-'
  noEvents: Aktuell gibt es keine Veranstaltungen 😕
  private: privat
  public: öffentlich
en:
  createEvent: Create event
  eventAuthor: by {username}
  legendSeparator: '-'
  noEvents: There are currently no events 😕
  private: private
  public: public
</i18n>
