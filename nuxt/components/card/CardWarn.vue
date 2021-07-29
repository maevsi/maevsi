<template>
  <div
    class="
      bg-yellow-600
      border-0
      card
      font-medium
      overflow-hidden
      text-center text-white
    "
    :class="{ 'rounded-none': isEdgy }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    isEdgy: {
      default: false,
      type: Boolean,
    },
  },
}
</script>
