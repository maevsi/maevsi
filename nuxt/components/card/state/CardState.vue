<template>
  <Card
    :background-color="backgroundColor"
    class="overflow-hidden border-0 text-center font-medium text-white"
    :class="{ 'rounded-none': isEdgy }"
  >
    <slot />
  </Card>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    backgroundColor: {
      default: undefined,
      type: String,
    },
    isEdgy: {
      default: false,
      type: Boolean,
    },
  },
})
</script>
