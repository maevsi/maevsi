<template>
  <div class="flex h-full items-center justify-center">
    <div class="animate-pulse" :title="t('globalLoading')">
      {{ t('globalLoading') }}
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>
