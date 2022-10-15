<template>
  <IconContainer
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    :title="t('title')"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </IconContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  title: Schließen
en:
  title: Close
</i18n>
