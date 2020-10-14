<template>
  <div
    v-if="validationObject.$error && !validationObject[validationProperty]"
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
      default: undefined,
    },
    validationObject: {
      type: Object,
      default: undefined,
    },
    validationProperty: {
      type: String,
      default: undefined,
    },
  },
}
</script>
