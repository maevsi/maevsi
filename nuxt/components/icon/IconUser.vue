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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </IconContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  title: Benutzer
en:
  title: User
</i18n>
