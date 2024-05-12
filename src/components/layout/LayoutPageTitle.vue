<template>
  <div>
    <div class="flex items-baseline gap-4">
      <ButtonIcon :aria-label="t('back')" @click="router.back()">
        <IHeroiconsChevronLeft />
      </ButtonIcon>
      <div class="flex-1 overflow-hidden">
        <slot v-if="$slots.default" />
        <div v-else>
          <h1 v-if="!isCentered">
            {{ title }}
          </h1>
        </div>
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
        :aria-label="t('settings')"
        class="shrink-0 2xl:hidden"
        :to="localePath(`/session/edit/${store.jwtDecoded?.id || 'anonymous'}`)"
      >
        <IHeroiconsBars3 height="2em" width="2em" />
      </ButtonIcon>
    </div>
    <h1 v-if="isCentered" class="text-center">
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  isButtonEventCreateShown?: boolean
  isCentered?: boolean
  title: string
}
withDefaults(defineProps<Props>(), {
  isButtonEventCreateShown: true,
  isCentered: false,
})

const store = useMaevsiStore()
const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
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
