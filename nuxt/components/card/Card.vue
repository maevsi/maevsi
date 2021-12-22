<template>
  <div class="bg-white border border-gray-300 p-4 rounded text-text-dark">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  name: 'MaevsiCard',
})
</script>
