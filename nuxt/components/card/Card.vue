<template>
  <div class="overflow-hidden rounded-lg p-4" :class="backgroundColor">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  name: 'MaevsiCard',
  props: {
    backgroundColor: {
      default: 'bg-background-brighten dark:bg-background-darken',
      type: String,
    },
  },
})
</script>
