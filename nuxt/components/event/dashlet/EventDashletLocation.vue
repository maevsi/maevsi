<template>
  <EventDashlet
    v-if="(event.isInPerson && event.location) || (event.isRemote && event.url)"
  >
    <span>
      <FontAwesomeIcon :icon="['fas', 'map-marker']" :title="$t('location')" />
    </span>
    <AppLink
      v-if="event.isInPerson && event.location"
      nofollow
      :to="`https://maps.google.de/?q=${encodeURIComponent(event.location)}`"
    >
      {{ event.location }}
    </AppLink>
    <AppLink v-if="event.isRemote && event.url" nofollow :to="event.url">
      {{ event.url }}
    </AppLink>
  </EventDashlet>
</template>

<script>
export default {
  props: {
    event: {
      default: undefined,
      type: Object,
    },
  },
}
</script>

<i18n lang="yml">
de:
  location: Ort
en:
  location: location
</i18n>
