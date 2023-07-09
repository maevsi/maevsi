<template>
  <!-- TODO: hide or show overflow completely -->
  <div
    class="overflow-x-hidden rounded-lg"
    :class="[backgroundColor, ...(isHigh ? ['px-4 py-6'] : ['p-4'])]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  backgroundColor?: string
  isHigh?: boolean
}
withDefaults(defineProps<Props>(), {
  backgroundColor: 'bg-background-brighten dark:bg-background-darken',
  isHigh: false,
})
</script>

<script lang="ts">
export default {
  name: 'MaevsiCard',
}
</script>
