<template>
  <Loader :api="api">
    <div class="mb-4">
      <div>
        <div
          v-if="regularEvents.length"
          class="flex flex-col items-center gap-4"
        >
          <ul class="flex w-full flex-col gap-4">
            <EventListItem
              v-for="event in regularEvents"
              :key="event.id"
              :event="event"
            />
          </ul>
          <div v-if="api.data.allEvents?.pageInfo.hasNextPage">
            <ButtonColored
              :aria-label="t('globalShowMore')"
              @click="after = api.data.allEvents?.pageInfo.endCursor"
            >
              {{ t('globalShowMore') }}
            </ButtonColored>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div v-if="draftEvents.length" class="flex flex-col gap-4">
          <ul class="flex w-full flex-col gap-4">
            <EventListItem
              v-for="event in draftEvents"
              :key="event.id"
              :event="event"
              :is-draft="true"
            />
          </ul>
        </div>
      </div>
    </div>
  </Loader>
</template>

<script setup lang="ts">
import { useAllEventsQuery } from '~~/gql/documents/queries/event/eventsAll'
import { getEventItem } from '~~/gql/documents/fragments/eventItem'
import {
  LocalStorageStrategy,
  type DraftEvent,
} from '~/composables/storage/LocalStorageStrategy'

export interface Props {
  accountId?: string
}

const props = withDefaults(defineProps<Props>(), {
  accountId: undefined,
})

const { t } = useI18n()
const after = ref<string>()
const storageStrategy = LocalStorageStrategy.getInstance()
const draftEvents = ref<DraftEvent[]>([])

const eventsQuery = await zalgo(
  useAllEventsQuery({
    after,
    authorAccountId: props.accountId,
    first: ITEMS_PER_PAGE,
  }),
)

const api = getApiData([eventsQuery])
const regularEvents = computed(
  () =>
    eventsQuery.data.value?.allEvents?.nodes
      .map((x) => getEventItem(x))
      .filter(isNeitherNullNorUndefined) || [],
)

onMounted(async () => {
  draftEvents.value = await storageStrategy.getAllEvents()
})
</script>
