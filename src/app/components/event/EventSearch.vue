<template>
  <Loader :api="api">
    <div class="flex flex-col gap-4">
      <SearchBar v-model="searchQuery" />
      <EventList
        :events="events"
        :has-next-page="pageInfo?.hasNextPage"
        @load-more="loadMore"
      />
    </div>
  </Loader>
</template>

<script setup lang="ts">
import { refDebounced } from '@vueuse/core'

import { useAllEventsQuery } from '~~/gql/documents/queries/event/eventsAll'
import { useEventSearchQuery } from '~~/gql/documents/queries/event/eventSearchQuery'
import { getEventItem } from '~~/gql/documents/fragments/eventItem'

const allEventsQueryAfter = ref<string>()
const allEventsQuery = await zalgo(
  useAllEventsQuery({
    after: allEventsQueryAfter,
    first: ITEMS_PER_PAGE,
  }),
)

const searchQuery = ref<string>()
const searchQueryDebounced = refDebounced(searchQuery, 300)
const searchQueryVariable = computed(() =>
  searchQueryDebounced.value?.trim().split(/\s+/).join(' OR '),
)
const searchResultsQueryAfter = ref<string>()
const searchResultsQuery = await zalgo(
  useEventSearchQuery({
    after: searchResultsQueryAfter,
    query: searchQueryVariable,
    first: ITEMS_PER_PAGE,
  }),
)
watch(searchQueryVariable, () => {
  searchResultsQueryAfter.value = undefined
})

const query = computed(() =>
  searchQueryVariable.value ? searchResultsQuery : allEventsQuery,
)
const pageInfo = computed(() =>
  searchQueryVariable.value
    ? searchResultsQuery.data.value?.eventSearch?.pageInfo
    : allEventsQuery.data.value?.allEvents?.pageInfo,
)
const events = computed(() => {
  if (!query.value.data.value) return

  if ('allEvents' in query.value.data.value) {
    return (
      query.value.data.value?.allEvents?.nodes
        ?.map(getEventItem)
        .filter(isNeitherNullNorUndefined) || []
    )
  }

  if ('eventSearch' in query.value.data.value) {
    return (
      query.value.data.value?.eventSearch?.nodes
        ?.map(getEventItem)
        .filter(isNeitherNullNorUndefined) || []
    )
  }

  return undefined
})

const api = getApiData([query.value])
const loadMore = () => {
  if (!query.value.data.value) return

  if ('allEvents' in query.value.data.value) {
    allEventsQueryAfter.value =
      query.value.data.value?.allEvents?.pageInfo.endCursor
  }

  if ('eventSearch' in query.value.data.value) {
    searchResultsQueryAfter.value =
      query.value.data.value?.eventSearch?.pageInfo.endCursor
  }
}
</script>
