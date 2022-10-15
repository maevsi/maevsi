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
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </IconContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  title: Ausloggen
en:
  title: Sign-out
</i18n>
