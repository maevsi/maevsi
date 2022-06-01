<template>
  <Card
    class="overflow-hidden border-0 text-center font-medium text-white"
    :class="{ 'rounded-none': isEdgy }"
    role="alert"
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
