<template>
  <div
    class="
      bg-blue-600
      border-0
      card
      dark:card-dark
      font-medium
      overflow-hidden
      text-center text-white
    "
    :class="{ 'rounded-none': isEdgy }"
  >
    <slot />
  </div>
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
