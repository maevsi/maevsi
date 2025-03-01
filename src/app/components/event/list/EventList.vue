<template>
  <div>
    <div class="mb-4">
      <SearchBar v-model="searchQuery" :is-searching="isSearching" />
    </div>

    <Loader :api="api">
      <div v-if="events?.length" class="flex flex-col items-center gap-4">
        <ul class="flex w-full flex-col gap-4">
          <EventListItem
            v-for="event in events"
            :key="event.id"
            :event="event"
          />
        </ul>
        <div
          v-if="
            (searchQuery.trim().length < 2 &&
              api.data.allEvents?.pageInfo.hasNextPage) ||
            (searchQuery.trim().length >= 2 &&
              api.data.eventSearch?.pageInfo.hasNextPage)
          "
        >
          <ButtonColored
            :aria-label="t('globalShowMore')"
            @click="
              after =
                searchQuery.trim().length < 2
                  ? api.data.allEvents?.pageInfo.endCursor
                  : api.data.eventSearch?.pageInfo.endCursor
            "
          >
            {{ t('globalShowMore') }}
          </ButtonColored>
        </div>
      </div>
      <p v-else-if="!isSearching" class="text-center">
        {{
          searchQuery.trim().length >= 2
            ? t('noSearchResults', { term: searchQuery.trim() })
            : t('noEvents')
        }}
      </p>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAllEventsQuery } from '~~/gql/documents/queries/event/eventsAll'
import { useEventSearchQuery } from '~~/gql/documents/queries/event/eventSearchQuery'
import { getEventItem } from '~~/gql/documents/fragments/eventItem'
import { Language, type EventSearchQuery } from '~~/gql/generated/graphql'
import { useDebounce } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// refs
const after = ref<string>()
const searchQuery = ref<string>('')
const isSearching = ref(false)

export interface Props {
  accountId?: string
}
const props = withDefaults(defineProps<Props>(), {
  accountId: undefined,
})

const eventsQuery = await zalgo(
  useAllEventsQuery({
    after,
    createdBy: props.accountId,
    first: ITEMS_PER_PAGE,
  }),
)

const debouncedSearchQuery = useDebounce(searchQuery, 300)

const searchLanguage = computed(() =>
  locale.value === 'de' ? Language.De : Language.En,
)

const computedSearchVars = computed(() => {
  const trimmed = debouncedSearchQuery.value.trim()
  if (trimmed.length < 2) return null

  let searchTerm = trimmed
  const wordsArray: string[] = trimmed.split(' ').filter(Boolean)
  if (wordsArray.length === 1 && wordsArray[0] && wordsArray[0].length < 5) {
    searchTerm = `${wordsArray[0]}* ${wordsArray[0]}`
  }
  return { query: searchTerm, language: searchLanguage.value }
})

const searchVars = ref<{ query: string; language: Language } | null>(null)
watch(
  computedSearchVars,
  (newVars) => {
    searchVars.value = newVars
  },
  { immediate: true },
)

const searchResultsQuery = useEventSearchQuery(
  () => ({
    query: searchVars.value?.query || '',
    language: searchVars.value?.language || searchLanguage.value,
  }),
  { pause: computed(() => searchVars.value === null) },
)

const activeQuery = computed(() =>
  debouncedSearchQuery.value.trim().length < 2
    ? eventsQuery
    : searchResultsQuery,
)

const api = computed(() => getApiData([activeQuery.value]).value)

const events = computed(() => {
  const trimmed = searchQuery.value.trim()
  if (trimmed.length < 2) {
    return (
      eventsQuery.data.value?.allEvents?.nodes
        ?.map(getEventItem)
        .filter(isNeitherNullNorUndefined) || []
    )
  }
  if (activeQuery.value?.data.value) {
    const searchData = activeQuery.value.data.value as EventSearchQuery
    return (
      searchData.eventSearch?.nodes
        ?.map(getEventItem)
        .filter(isNeitherNullNorUndefined) || []
    )
  }
  return (
    eventsQuery.data.value?.allEvents?.nodes
      ?.map(getEventItem)
      .filter(isNeitherNullNorUndefined) || []
  )
})

watch(debouncedSearchQuery, () => {
  after.value = undefined
})
</script>

<i18n lang="yaml">
de:
  noEvents: Aktuell gibt es keine Veranstaltungen 😕
  noSearchResults: 'Keine Ergebnisse für "{term}" gefunden 😕'
en:
  noEvents: There are currently no events 😕
  noSearchResults: 'No results found for "{term}" 😕'
</i18n>
