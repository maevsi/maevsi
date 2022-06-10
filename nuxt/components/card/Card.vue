<template>
  <div
    class="overflow-hidden rounded border border-neutral-300 p-4 text-text-dark dark:border-neutral-600 dark:text-text-bright"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  name: 'MaevsiCard',
})
</script>
