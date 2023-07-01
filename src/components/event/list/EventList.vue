<template>
  <Loader :api="api">
    <div v-if="events?.length" class="flex flex-col gap-4">
      <div v-if="isButtonEventListShown" class="px-1">
        <ButtonEventList />
      </div>
      <ul class="flex flex-col gap-4">
        <EventListItem v-for="event in events" :key="event.id" :event="event" />
      </ul>
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
    </div>
    <p v-else class="text-center">{{ t('noEvents') }}</p>
  </Loader>
</template>

<script setup lang="ts">
import { useAllEventsQuery } from '~/gql/documents/queries/event/eventsAll'
import { getEventItem } from '~/gql/documents/fragments/eventItem'

export interface Props {
  accountId?: string
}
const props = withDefaults(defineProps<Props>(), {
  accountId: undefined,
})

const route = useRoute()
const { t } = useI18n()

// refs
const after = ref<string>()

// api data
const eventsQuery = await useAllEventsQuery({
  after,
  authorAccountId: props.accountId,
  first: ITEMS_PER_PAGE,
})
const api = getApiData([eventsQuery])
const events = computed(
  () =>
    eventsQuery.data.value?.allEvents?.nodes
      .map((x) => getEventItem(x))
      .filter(isNeitherNullNorUndefined) || [],
)

// data
const isButtonEventListShown = ref(
  typeof route.name === 'string' &&
    route.name?.replace(/___.+$/, '') !== 'event',
)
</script>

<i18n lang="yaml">
de:
  noEvents: Aktuell gibt es keine Veranstaltungen 😕
en:
  noEvents: There are currently no events 😕
</i18n>
