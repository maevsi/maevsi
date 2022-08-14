<template>
  <CardState background-color="bg-red-600" :is-edgy="isEdgy" role="alert">
    <slot />
  </CardState>
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
