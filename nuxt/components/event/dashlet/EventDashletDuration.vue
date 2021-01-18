<template>
  <EventDashlet v-if="event.end">
    <span>
      <FontAwesomeIcon :icon="['fas', 'hourglass']" :title="$t('duration')" />
    </span>
    {{
      $moment.duration($moment(event.end).diff($moment(event.start))).humanize()
    }}
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
  duration: 'Dauer'
en:
  duration: 'duration'
</i18n>
