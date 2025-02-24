<template>
  <div>
    <div class="mb-4">
      <div class="flex">
        <label class="hidden" for="event-search">{{ t('search') }}</label>
        <input
          id="event-search"
          v-model="localSearchTerm"
          class="form-input cursor-text rounded-r-none dark:border-gray-500 dark:bg-gray-700 dark:placeholder:text-gray-300"
          :placeholder="t('search')"
          type="text"
          @input="debouncedSearch"
        />
        <span
          class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300"
        >
          <IHeroiconsMagnifyingGlass />
        </span>
      </div>
    </div>

    <Loader :api="api">
      <div
        v-if="filteredEvents.length"
        class="flex flex-col items-center gap-4"
      >
        <ul class="flex w-full flex-col gap-4">
          <EventListItem
            v-for="event in filteredEvents"
            :key="event.id"
            :event="event"
          />
        </ul>
        <div
          v-if="
            api.data.allEvents?.pageInfo.hasNextPage && !effectiveSearchTerm
          "
        >
          <ButtonColored
            :aria-label="t('globalShowMore')"
            @click="after = api.data.allEvents?.pageInfo.endCursor"
          >
            {{ t('globalShowMore') }}
          </ButtonColored>
        </div>
      </div>
      <p v-else class="text-center">
        {{
          effectiveSearchTerm
            ? t('noSearchResults', { term: effectiveSearchTerm })
            : t('noEvents')
        }}
      </p>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { useAllEventsQuery } from '~~/gql/documents/queries/event/eventsAll'
import { getEventItem } from '~~/gql/documents/fragments/eventItem'

export interface Props {
  accountId?: string
  searchTerm?: string
}
const props = withDefaults(defineProps<Props>(), {
  accountId: undefined,
  searchTerm: '',
})

const { t } = useI18n()

// refs
const after = ref<string>()
const searchTerm = toRef(props, 'searchTerm')
const localSearchTerm = ref('')
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)
const debounceDelay = 300

const effectiveSearchTerm = computed(() => {
  return localSearchTerm.value || searchTerm.value
})

// methods
const debouncedSearch = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
  }
  timeoutId.value = setTimeout(() => {}, debounceDelay)
}

onBeforeUnmount(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
  }
})

// api data
const eventsQuery = await zalgo(
  useAllEventsQuery({
    after,
    authorAccountId: props.accountId,
    first: ITEMS_PER_PAGE,
  }),
)
const api = getApiData([eventsQuery])
const events = computed(
  () =>
    eventsQuery.data.value?.allEvents?.nodes
      .map((x) => getEventItem(x))
      .filter(isNeitherNullNorUndefined) || [],
)

const filteredEvents = computed(() => {
  if (!effectiveSearchTerm.value) return events.value

  const term = effectiveSearchTerm.value.toLowerCase()
  return events.value.filter((event) => {
    return (
      (event.name && event.name.toLowerCase().includes(term)) ||
      (event.description && event.description.toLowerCase().includes(term)) ||
      (event.location && event.location.toLowerCase().includes(term))
    )
  })
})
</script>

<i18n lang="yaml">
de:
  noEvents: Aktuell gibt es keine Veranstaltungen 😕
  noSearchResults: Keine Veranstaltungen gefunden für "{term}" 😕
  search: Suche
en:
  noEvents: There are currently no events 😕
  noSearchResults: No events found for "{term}" 😕
  search: Search
</i18n>
