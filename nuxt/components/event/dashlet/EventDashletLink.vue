<template>
  <EventDashlet>
    <span>
      <IconLink :title="$t('url')" />
    </span>
    <AppLink
      v-if="event.isRemote && event.url"
      class="w-full overflow-hidden text-ellipsis break-words line-clamp-2"
      nofollow
      :to="event.url"
    >
      {{ event.url }}
    </AppLink>
  </EventDashlet>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'
import { Event } from '~/types/event'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
  },
})
</script>

<i18n lang="yml">
de:
  url: Link
en:
  url: Link
</i18n>
