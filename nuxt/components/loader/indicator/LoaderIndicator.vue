<template>
  <div class="flex justify-center" :title="t('globalLoading')">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
