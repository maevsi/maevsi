<template>
  <EventDashlet v-if="event.isInPerson || event.isRemote">
    <span>
      <FontAwesomeIcon
        v-if="event.isInPerson"
        :icon="['fas', 'handshake']"
        :title="$t('inPerson')"
      />
      <FontAwesomeIcon
        v-if="event.isRemote"
        :icon="['fas', 'wifi']"
        :title="$t('remote')"
      />
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
      required: true,
      type: Object,
    },
  },
}
</script>

<i18n lang="yml">
de:
  inPerson: vor Ort
  remote: digital
en:
  inPerson: in person
  remote: remote
</i18n>
