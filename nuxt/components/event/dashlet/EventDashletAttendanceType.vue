<template>
  <EventDashlet v-if="event.isInPerson || event.isRemote">
    <span class="flex gap-2">
      <IconHandshake v-if="event.isInPerson" :title="t('inPerson')" />
      <IconWifi v-if="event.isRemote" :title="t('remote')" />
    </span>
    {{
      [
        ...(event.isInPerson ? [t('inPerson')] : []),
        ...(event.isRemote ? [t('remote')] : []),
      ].join(', ')
    }}
  </EventDashlet>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Event } from '~/types/event'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
  },
  setup() {
    const { t } = useI18n()

    const methods = {
      t,
    }

    return {
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  inPerson: vor Ort
  remote: digital
en:
  inPerson: in person
  remote: remote
</i18n>
