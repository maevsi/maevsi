<template>
  <div
    class="overflow-hidden rounded-lg p-4 dark:bg-background-darken bg-background-brighten"
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
