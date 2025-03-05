<template>
  <div v-if="events?.length" class="flex flex-col items-center gap-4">
    <ul class="flex w-full flex-col gap-4">
      <EventListItem v-for="event in events" :key="event.id" :event="event" />
    </ul>
    <ButtonColored
      v-if="hasNextPage"
      :aria-label="t('globalShowMore')"
      @click="emit('loadMore')"
    >
      {{ t('globalShowMore') }}
    </ButtonColored>
  </div>
  <p v-else class="text-center">{{ t('noEvents') }}</p>
</template>

<script setup lang="ts">
import type { EventItemFragment } from '~~/gql/generated/graphql'

export interface Props {
  events?: EventItemFragment[]
  hasNextPage?: boolean
}
withDefaults(defineProps<Props>(), {
  events: undefined,
  hasNextPage: undefined,
})

const emit = defineEmits<{
  loadMore: []
}>()

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  noEvents: Keine Veranstaltungen verfügbar 😕
en:
  noEvents: No events available 😕
</i18n>
