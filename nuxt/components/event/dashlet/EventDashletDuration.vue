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

<script lang="ts">
import { PropType } from 'vue'

import { Event } from '~/types/event'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
  },
  setup() {
    const { t } = useI18n()

    const methods = {
      t,
    }

    return {
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  duration: Dauer
en:
  duration: duration
</i18n>
