<template>
  <Loader
    v-if="(isFetching && !data) || error"
    :errors="$util.getGqlErrorMessages(error, this)"
  />
  <div v-else class="flex flex-col gap-4">
    <div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
      <ButtonList>
        <ButtonEventList v-if="isButtonEventListShown" />
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
    <ul v-if="data?.allEvents?.nodes?.length">
      <EventListItem
        v-for="event in data.allEvents.nodes"
        :key="event.id"
        :event="event"
      />
      <div
        v-if="data.allEvents.pageInfo.hasNextPage"
        class="flex justify-center"
      >
        <ButtonColored
          :aria-label="$t('globalShowMore')"
          @click="after = data.allEvents.pageInfo.endCursor"
        >
          {{ $t('globalShowMore') }}
        </ButtonColored>
      </div>
    </ul>
    <p v-else class="text-center">{{ $t('noEvents') }}</p>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@urql/vue'
import consola from 'consola'
import { ref, watch } from 'vue'

import { useNuxtApp, useRoute, defineComponent, PropType } from '#app'

import EVENTS_ALL_QUERY from '~/gql/query/event/eventsAll.gql'

export default defineComponent({
  props: {
    username: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
  setup(props) {
    const nuxtApp = useNuxtApp()
    const route = useRoute()
    const after = ref<string>()

    const result = useQuery({
      query: EVENTS_ALL_QUERY,
      variables: {
        after,
        authorUsername: props.username,
        first: nuxtApp.nuxt2Context.$util.ITEMS_PER_PAGE,
      },
    })

    watch(result.error, (currentValue, _oldValue) => {
      if (currentValue) consola.error(currentValue)
    })

    const apiData = {
      after,
      data: result.data,
      error: result.error,
      isFetching: result.fetching,
    }

    const data = {
      isButtonEventListShown: route.name?.replace(/___.+$/, '') !== 'event',
    }

    return {
      ...apiData,
      ...data,
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
