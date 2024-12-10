<template>
  <div
    class="flex h-full items-center justify-center"
    :title="t('globalLoading')"
  >
    <div class="flex w-1/2 items-center justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
