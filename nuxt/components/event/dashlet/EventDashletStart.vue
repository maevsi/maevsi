<template>
  <EventDashlet v-if="event && event.start">
    <span>
      <IconCalendar :title="$t('start')" />
    </span>
    {{ $moment(event.start).format('lll') }}
    <span class="hidden sm:inline">
      {{ $t('embraced', { content: $moment(event.start).fromNow() }) }}
    </span>
  </EventDashlet>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'
import { Event } from '~/types/event'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
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
