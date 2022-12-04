<template>
  <EventDashlet v-if="event.start">
    <span>
      <IconCalendar :title="t('start')" />
    </span>
    <div class="flex flex-col">
      <span>
        {{ $moment(event.start).format('lll') }}
      </span>
      <span class="hidden sm:inline">
        {{ t('embraced', { content: $moment(event.start).fromNow() }) }}
      </span>
    </div>
  </EventDashlet>
</template>

<script setup lang="ts">
import { Event } from '~/gql/generated'

export interface Props {
  event: Pick<Event, 'start'>
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  embraced: ({content})
  start: Beginn
en:
  embraced: ({content})
  start: start
</i18n>
