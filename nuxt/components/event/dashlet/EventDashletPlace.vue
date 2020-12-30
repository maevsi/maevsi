<template>
  <EventDashlet v-if="event.place">
    <FontAwesomeIcon :icon="['fas', 'map-marker']" />
    <br />
    <AppLink
      nofollow
      :to="`https://maps.google.de/?q=${encodeURIComponent(event.place)}`"
    >
      {{ event.place }}
    </AppLink>
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
