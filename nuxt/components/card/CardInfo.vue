<template>
  <Card
    class="overflow-hidden border-0 bg-blue-600 text-center font-medium text-white"
    :class="{ 'rounded-none': isEdgy }"
  >
    <slot />
  </Card>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  props: {
    isEdgy: {
      default: false,
      type: Boolean,
    },
  },
})
</script>
