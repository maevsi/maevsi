<template>
  <div
    v-if="runtimeConfig.public.vio.environment !== 'production'"
    class="relative"
  >
    <slot />
    <div class="absolute inset-0 opacity-20 under-construction" />
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>
