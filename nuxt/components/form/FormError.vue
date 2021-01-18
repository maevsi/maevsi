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
      default: undefined,
      type: Object,
    },
    validationProperty: {
      default: undefined,
      type: String,
    },
  },
}
</script>
