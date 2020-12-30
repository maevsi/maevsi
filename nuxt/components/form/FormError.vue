<template>
  <div
    v-if="validationObject.$error && !validationObject[validationProperty]"
    class="text-red-600 text-left"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
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
