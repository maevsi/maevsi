<template>
  <EventDashlet v-if="event.start">
    <FontAwesomeIcon :icon="['fas', 'calendar-day']" />
    {{ $moment(event.start).format('lll') }}
    <br />
    ({{ $moment(event.start).fromNow() }})
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
