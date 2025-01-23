<template>
  <Loader :api="api">
    <div class="mb-4">
      <div class="mb-4 flex gap-x-4">
        <Button
          :aria-label="'Published Tab'"
          class="justify-center rounded-md px-4 py-2 font-medium"
          :class="{
            'bg-accent-strong': activeTab === 'published',
            'bg-accent-weak': activeTab !== 'published',
          }"
          :disabled="false"
          @click="activeTab = 'published'"
        >
          {{ t('published') }}
        </Button>

        <Button
          :aria-label="'Draft Tab'"
          class="justify-center rounded-md px-4 py-2 font-medium"
          :class="{
            'bg-accent-strong': activeTab === 'drafts',
            'bg-accent-weak': activeTab !== 'drafts',
          }"
          :disabled="false"
          @click="activeTab = 'drafts'"
        >
          {{ t('draft') }}
        </Button>
      </div>

      <div v-if="activeTab === 'published'">
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

      <div v-if="activeTab === 'drafts'">
        <div v-if="draftEvents.length" class="flex flex-col gap-4">
          <ul class="flex w-full flex-col gap-4">
            <EventListItem
              v-for="event in draftEvents"
              :key="event.id"
              :event="event"
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
const activeTab = ref<'published' | 'drafts'>('published')

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

<i18n lang="yaml">
de:
  draft: Entwurf
  published: Veröffentlicht
en:
  draft: Draft
  published: Published
</i18n>
