<template>
  <div
    v-if="trigger"
    class="text-red-600 text-left"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: undefined
    },
    trigger: {
      type: Boolean,
      default: undefined
    }
  }
}
</script>
