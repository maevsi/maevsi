<template>
  <div
    class="flex h-full items-center justify-center"
    :title="t('globalLoading')"
  >
    <div class="flex items-center justify-center w-1/2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
