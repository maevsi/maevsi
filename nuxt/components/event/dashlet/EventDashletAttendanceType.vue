<template>
  <EventDashlet v-if="event.isInPerson || event.isRemote">
    <span>
      <FontAwesomeIcon :icon="['fas', 'handshake']" />
      <FontAwesomeIcon :icon="['fas', 'wifi']" />
    </span>
    {{
      [
        ...(event.isInPerson ? [$t('inPerson')] : []),
        ...(event.isRemote ? [$t('remote')] : []),
      ].join(', ')
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

<i18n lang="yml">
de:
  inPerson: 'vor Ort'
  remote: 'remote'
en:
  inPerson: 'in person'
  remote: 'remote'
</i18n>
