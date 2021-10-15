<template>
  <EventDashlet v-if="event && event.end && event.start">
    <span>
      <FontAwesomeIcon :icon="['fas', 'hourglass']" :title="$t('duration')" />
    </span>
    {{
      $moment.duration($moment(event.end).diff($moment(event.start))).humanize()
    }}
  </EventDashlet>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
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
  duration: Dauer
en:
  duration: duration
</i18n>
