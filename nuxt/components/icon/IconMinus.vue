<template>
  <IconContainer
    :title="t('title')"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20 12H4"
    />
  </IconContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  title: Vor
en:
  title: Forward
</i18n>
