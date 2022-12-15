<template>
  <EventDashlet v-if="event.end && event.start">
    <span>
      <IconHourglass :title="t('duration')" />
    </span>
    {{
      // @ts-ignore types should work https://github.com/iamkun/dayjs/issues/2106
      $moment.duration($moment(event.end).diff($moment(event.start))).humanize()
    }}
  </EventDashlet>
</template>

<script setup lang="ts">
import { Event } from '~/gql/generated'

export interface Props {
  event: Pick<Event, 'end' | 'start'>
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
