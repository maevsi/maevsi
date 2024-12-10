<template>
  <div
    v-if="runtimeConfig.public.vio.environment !== 'production'"
    class="relative"
  >
    <slot />
    <div class="under-construction absolute inset-0 opacity-20" />
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>
