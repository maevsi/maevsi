<template>
  <div
    class="bg-white border border-gray-300 p-4 rounded shadow-md dark:shadow-md-white text-text-dark"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MaevsiCard',
})
</script>
