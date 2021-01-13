<template>
  <EventDashlet v-if="event.location">
    <span>
      <FontAwesomeIcon :icon="['fas', 'map-marker']" :title="$t('location')" />
    </span>
    <AppLink
      nofollow
      :to="`https://maps.google.de/?q=${encodeURIComponent(event.location)}`"
    >
      {{ event.location }}
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

<i18n lang="yml">
de:
  location: 'Ort'
en:
  location: 'location'
</i18n>
