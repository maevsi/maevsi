<template>
  <LoaderIndicator class="animate-pulse">
    {{ t('globalLoading') }}
  </LoaderIndicator>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
