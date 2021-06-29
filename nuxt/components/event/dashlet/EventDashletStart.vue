<template>
  <EventDashlet v-if="event.start">
    <span>
      <FontAwesomeIcon :icon="['fas', 'calendar-day']" :title="$t('start')" />
    </span>
    {{ $moment(event.start).format('lll') }}
    <br />
    {{ $t('embraced', { content: $moment(event.start).fromNow() }) }}
  </EventDashlet>
</template>

<script>
export default {
  props: {
    event: {
      required: true,
      type: Object,
    },
  },
}
</script>

<i18n lang="yml">
de:
  embraced: ({content})
  start: Beginn
en:
  embraced: ({content})
  start: start
</i18n>
