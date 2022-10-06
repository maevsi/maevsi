<template>
  <EventDashlet v-if="event.isRemote && event.url">
    <span>
      <IconLink :title="t('url')" />
    </span>
    <AppLink
      class="w-full overflow-hidden text-ellipsis break-words line-clamp-2"
      nofollow
      :to="event.url"
    >
      {{ event.url }}
    </AppLink>
  </EventDashlet>
</template>

<script setup lang="ts">
import { Event } from '~/types/event'

export interface Props {
  event: Event
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  url: Link
en:
  url: Link
</i18n>
