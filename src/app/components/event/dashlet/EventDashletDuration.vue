<template>
  <EventDashlet v-if="event.end && event.start">
    <span>
      <ISolarHourglassOutline :title="t('duration')" />
    </span>
    {{
      // @ts-ignore `duration` should be part of `$dayjs` (https://github.com/iamkun/dayjs/issues/2106)
      $dayjs.duration($dayjs(event.end).diff($dayjs(event.start))).humanize()
    }}
  </EventDashlet>
</template>

<script setup lang="ts">
import type { EventItemFragment } from '~/gql/generated/graphql'

export interface Props {
  event: Pick<EventItemFragment, 'end' | 'start'>
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
