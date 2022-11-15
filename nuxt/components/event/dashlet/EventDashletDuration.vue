<template>
  <EventDashlet v-if="event.end && event.start">
    <span>
      <IconHourglass :title="t('duration')" />
    </span>
    {{
      $moment.duration($moment(event.end).diff($moment(event.start))).humanize()
    }}
  </EventDashlet>
</template>

<script setup lang="ts">
import { Event } from '~/types/event'

export interface Props {
  event: Event
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  duration: Dauer
en:
  duration: duration
</i18n>
