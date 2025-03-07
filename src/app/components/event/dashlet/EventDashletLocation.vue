<template>
  <!-- TODO: reenable to address usage -->
  <EventDashlet v-if="event.isInPerson /*&& event.location*/">
    <span>
      <IHeroiconsMapPinSolid :title="t('location')" />
    </span>
    <!-- <AppLink
      class="line-clamp-2"
      is-external
      :to="`https://maps.google.de/?q=${encodeURIComponent(event.location)}`"
    >
      {{ event.location }}
    </AppLink> -->
  </EventDashlet>
</template>

<script setup lang="ts">
import type { EventItemFragment } from '~~/gql/generated/graphql'

export interface Props {
  event: Pick<EventItemFragment, 'isInPerson'> //  | 'location'
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
