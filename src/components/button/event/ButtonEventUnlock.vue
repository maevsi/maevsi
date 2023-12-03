<template>
  <ButtonColored
    :aria-label="t('eventUnlock')"
    :to="localePath('/tasks/events/unlock')"
    @click="emit('click')"
  >
    {{ t('eventUnlock') }}
    <template #prefix>
      <IHeroiconsKey />
    </template>
  </ButtonColored>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

const emit = defineEmits<{
  click: []
}>()
</script>

<i18n lang="yaml">
de:
  eventUnlock: Einladungscode eingeben
en:
  eventUnlock: Enter invitation code
</i18n>
