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
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </IconContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  title: Code
en:
  title: Code
</i18n>
