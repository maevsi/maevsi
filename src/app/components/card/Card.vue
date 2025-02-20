<template>
  <!-- TODO: hide or show overflow completely -->
  <div
    class="overflow-x-hidden rounded-xl"
    :class="[backgroundColor, ...['p-4']]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  backgroundColor?: string
}

withDefaults(defineProps<Props>(), {
  backgroundColor:
    'bg-background-card-bright border border-[0.1px] border-accent-line shadow-[var(--color-shadow-card)] dark:bg-background-darken',
})
</script>

<script lang="ts">
export default {
  name: 'MaevsiCard',
}
</script>
