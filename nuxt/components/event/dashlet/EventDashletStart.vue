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
  embraced: ({content})
  start: Beginn
en:
  embraced: ({content})
  start: start
</i18n>
