<template>
  <Loader :api="api">
    <ul v-if="events?.length" class="flex flex-col gap-4">
      <div
        v-if="isButtonEventListShown"
        class="flex flex-col items-center justify-between gap-4 lg:flex-row"
      >
        <ButtonList>
          <ButtonEventList v-if="isButtonEventListShown" />
        </ButtonList>
      </div>
      <EventListItem v-for="event in events" :key="event.id" :event="event" />
      <div
        v-if="api.data.allEvents?.pageInfo.hasNextPage"
        class="flex justify-center"
      >
        <ButtonColored
          :aria-label="t('globalShowMore')"
          @click="after = api.data.allEvents?.pageInfo.endCursor"
        >
          {{ t('globalShowMore') }}
        </ButtonColored>
      </div>
    </ul>
    <p v-else class="text-center">{{ t('noEvents') }}</p>
  </Loader>
</template>

<script setup lang="ts">
import consola from 'consola'

import { ITEMS_PER_PAGE } from '~/plugins/util/constants'
import { getApiMeta } from '~/plugins/util/util'
import { useAllEventsQuery } from '~/gql/generated'

export interface Props {
  username?: string
}
const props = withDefaults(defineProps<Props>(), {
  username: undefined,
})

const route = useRoute()
const { t } = useI18n()

// refs
const after = ref<string>()

// queries
const eventsQuery = useAllEventsQuery({
  variables: {
    after,
    authorUsername: props.username,
    first: ITEMS_PER_PAGE,
  },
})

// api data
const api = computed(() => {
  return {
    data: {
      ...eventsQuery.data.value,
    },
    ...getApiMeta([eventsQuery]),
  }
})
const events = computed(() => eventsQuery.data.value?.allEvents?.nodes)

// data
const isButtonEventListShown = ref(
  typeof route.name === 'string' &&
    route.name?.replace(/___.+$/, '') !== 'event'
)

// lifecycle
watch(eventsQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})
</script>

<i18n lang="yml">
de:
  noEvents: Aktuell gibt es keine Veranstaltungen 😕
en:
  noEvents: There are currently no events 😕
</i18n>
