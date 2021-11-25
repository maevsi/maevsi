<template>
  <Card
    class="bg-yellow-600 border-0 font-medium overflow-hidden text-center text-white"
    :class="{ 'rounded-none': isEdgy }"
  >
    <slot />
  </Card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    isEdgy: {
      default: false,
      type: Boolean,
    },
  },
})
</script>
