<template>
  <EventDashlet v-if="event.end">
    <FontAwesomeIcon :icon="['fas', 'hourglass']" />
    {{
      $moment.duration($moment(event.end).diff($moment(event.start))).humanize()
    }}
  </EventDashlet>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: undefined,
    },
  },
}
</script>
