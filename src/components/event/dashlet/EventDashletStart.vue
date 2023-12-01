<template>
  <EventDashlet v-if="event.start">
    <HeroiconsCalendar :title="t('start')" />
    <div class="flex flex-col">
      <span>
        {{ eventStart.format('lll') }}
      </span>
      <span class="hidden sm:inline">
        {{ t('embraced', { content: eventStart.fromNow() }) }}
      </span>
    </div>
  </EventDashlet>
</template>

<script setup lang="ts">
import HeroiconsCalendar from '~icons/heroicons/calendar'

import type { EventItemFragment } from '~/gql/generated/graphql'

export interface Props {
  event: Pick<EventItemFragment, 'start'>
}
const props = withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
const dateTime = useDateTime()

// computations
const eventStart = computed(() => dateTime(props.event.start))
</script>

<i18n lang="yaml">
de:
  embraced: ({content})
  start: Beginn
en:
  embraced: ({content})
  start: start
</i18n>
