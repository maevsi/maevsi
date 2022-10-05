<template>
  <CardState background-color="bg-yellow-600" :is-edgy="isEdgy">
    <slot />
  </CardState>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    isEdgy: {
      default: false,
      type: Boolean,
    },
  },
})
</script>
