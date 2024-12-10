<template>
  <Button
    :aria-label="t('text')"
    class="shrink-0 2xl:whitespace-nowrap 2xl:px-4 2xl:py-2 2xl:font-medium"
    :to="localePath('/event/create')"
  >
    <span class="hidden 2xl:block">
      {{ t('text') }}
    </span>
    <ISolarCalendarAddOutline class="2xl:hidden" height="2em" width="2em" />
    <template #prefix>
      <IHeroiconsPlus class="hidden 2xl:block" />
    </template>
  </Button>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  text: Veranstaltung erstellen
en:
  text: Create event
</i18n>
