<template>
  <ButtonColored
    :aria-label="t('eventAll')"
    :is-primary="false"
    :to="localePath('/event')"
    @click="$emit('click')"
  >
    {{ t('eventAll') }}
    <template #prefix>
      <IconListUl />
    </template>
  </ButtonColored>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  eventAll: Alle Veranstaltungen anzeigen
en:
  eventAll: Show all events
</i18n>
