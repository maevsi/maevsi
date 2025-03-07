<template>
  <LoaderImage
    :alt="t('heroImage')"
    aspect="aspect-[3/2]"
    classes="rounded-t-xl h-48 object-cover w-full"
    height="2"
    :src="`/assets/static/images/event/${getHeroImageName(event.name)}.jpg`"
    width="3"
  />
</template>

<script setup lang="ts">
import type { EventItemFragment } from '~~/gql/generated/graphql'

export interface Props {
  event: Pick<EventItemFragment, 'name'>
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  heroImage: Titelbild der Veranstaltung
en:
  heroImage: Title picture of the event
</i18n>
