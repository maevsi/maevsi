<template>
  <ButtonColored
    :aria-label="t('eventUnlock')"
    :to="localePath('/task/event/unlock')"
    @click="emit('click')"
  >
    {{ t('eventUnlock') }}
    <template #prefix>
      <IconKey />
    </template>
  </ButtonColored>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<i18n lang="yaml">
de:
  eventUnlock: Einladungscode eingeben
en:
  eventUnlock: Enter invitation code
</i18n>
