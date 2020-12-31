<template>
  <EventDashlet v-if="event.place">
    <span>
      <FontAwesomeIcon :icon="['fas', 'map-marker']" />
    </span>
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
