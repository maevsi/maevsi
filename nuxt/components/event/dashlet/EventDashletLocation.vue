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

<script setup lang="ts">
import { Event } from '~/gql/generated'

export interface Props {
  event: Pick<Event, 'isInPerson' | 'location'>
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  location: Ort
en:
  location: location
</i18n>
