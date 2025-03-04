<template>
  <!-- TODO: hide or show overflow completely -->
  <div
    class="overflow-x-hidden rounded-xl p-4"
    :class="[backgroundColor, borderColor]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  backgroundColor?: string
  borderColor?: string
}
withDefaults(defineProps<Props>(), {
  backgroundColor: 'bg-base-white shadow-xs dark:bg-background-darken',
  borderColor: 'border border-faint-line',
})
</script>

<script lang="ts">
export default {
  name: 'MaevsiCard',
}
</script>
