<template>
  <div>
    <div class="flex items-baseline gap-4">
      <ButtonIcon v-if="props.to" :aria-label="t('back')" :to="props.to">
        <IHeroiconsChevronLeft />
      </ButtonIcon>
      <div v-if="!centered" class="flex-1 overflow-hidden">
        <slot v-if="$slots.default" />
        <h1 v-else>
          {{ title }}
        </h1>
      </div>
      <ButtonIcon
        v-if="isButtonEventCreateShown"
        :aria-label="t('eventCreate')"
        class="shrink-0 2xl:hidden"
        :to="localePath(`/event/create`)"
      >
        <ISolarCalendarAddOutline height="2em" width="2em" />
      </ButtonIcon>
      <ButtonIcon
        v-if="store.jwtDecoded"
        :aria-label="t('settings')"
        class="shrink-0 2xl:hidden"
        :to="localePath(`/session/edit/${store.jwtDecoded.id}`)"
      >
        <IHeroiconsBars3 height="2em" width="2em" />
      </ButtonIcon>
    </div>
    <h1 v-if="centered" class="text-center">
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang="ts" generic="T extends RoutesNamesList, P extends string">
import type { NuxtRoute, RoutesNamesList } from '@typed-router'

export interface Props<T extends RoutesNamesList, P extends string> {
  isButtonEventCreateShown?: boolean
  title: string
  to?: NuxtRoute<T, P>
  centered?: boolean
}
const props = withDefaults(defineProps<Props<T, P>>(), {
  isButtonEventCreateShown: true,
  to: undefined,
  centered: false,
})

const store = useMaevsiStore()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
de:
  back: zurück
  eventCreate: Veranstaltung erstellen
  settings: Einstellungen
en:
  back: back
  eventCreate: Create event
  settings: Settings
</i18n>
