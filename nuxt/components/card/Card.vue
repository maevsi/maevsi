<template>
  <div class="overflow-hidden rounded-lg p-4" :class="backgroundColor">
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  backgroundColor?: string
}
withDefaults(defineProps<Props>(), {
  backgroundColor: 'bg-background-brighten dark:bg-background-darken',
})
</script>

<script lang="ts">
export default {
  name: 'MaevsiCard',
}
</script>
