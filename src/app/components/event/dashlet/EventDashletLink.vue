<template>
  <EventDashlet v-if="event.isRemote && event.url">
    <span>
      <IHeroiconsLink :title="t('url')" />
    </span>
    <AppLink class="line-clamp-2" is-external :to="event.url">
      {{ event.url }}
    </AppLink>
  </EventDashlet>
</template>

<script setup lang="ts">
import type { EventItemFragment } from '~~/gql/generated/graphql'

export interface Props {
  event: Pick<EventItemFragment, 'url' | 'isRemote'>
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  url: Link
en:
  url: Link
</i18n>
