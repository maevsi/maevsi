<template>
  <LayoutPageTitle is-centered :title="t('title')" />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  title: Test
en:
  title: Test
</i18n>
