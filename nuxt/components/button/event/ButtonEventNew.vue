<template>
  <ButtonText
    :aria-label="t('new')"
    :is-primary="false"
    :to="localePath('/task/event/create')"
    @click="$emit('click')"
  >
    {{ t('new') }}
    <template #prefix>
      <IconPlus />
    </template>
  </ButtonText>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  new: Veranstaltung erstellen
en:
  new: Create event
</i18n>
