<template>
  <div class="flex items-center gap-4">
    <ButtonIcon v-if="props.to" :aria-label="t('back')" :to="props.to">
      <IHeroiconsChevronLeft />
    </ButtonIcon>
    <h1 class="flex-1">
      {{ title }}
    </h1>
    <ButtonIcon
      v-if="store.jwtDecoded"
      :aria-label="t('settings')"
      class="2xl:hidden"
      :to="localePath(`/session/edit/${store.jwtDecoded.id}`)"
    >
      <IHeroiconsBars3 height="2em" width="2em" />
    </ButtonIcon>
  </div>
</template>

<script setup lang="ts" generic="T extends RoutesNamesList, P extends string">
import type { NuxtRoute, RoutesNamesList } from '@typed-router'

export interface Props<T extends RoutesNamesList, P extends string> {
  title: string
  to?: NuxtRoute<T, P>
}
const props = withDefaults(defineProps<Props<T, P>>(), {
  to: undefined,
})

const store = useMaevsiStore()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
de:
  back: zurück
  settings: Einstellungen
en:
  back: back
  settings: Settings
</i18n>
