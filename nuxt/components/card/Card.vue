<template>
  <div
    class="border border-neutral-300 dark:border-neutral-600 p-4 rounded text-text-dark dark:text-text-bright"
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
