<template>
  <EventDashlet v-if="event.isInPerson && event.location">
    <span>
      <IconMapMarker :title="t('location')" />
    </span>
    <AppLink
      class="w-full overflow-hidden text-ellipsis break-words line-clamp-2"
      nofollow
      :to="`https://maps.google.de/?q=${encodeURIComponent(event.location)}`"
    >
      {{ event.location }}
    </AppLink>
  </EventDashlet>
</template>

<script lang="ts">
import { PropType } from 'vue'

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
  location: Ort
en:
  location: location
</i18n>
