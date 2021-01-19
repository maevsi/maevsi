<template>
  <div
    v-if="
      formInput.$error &&
      validationProperty in formInput &&
      !formInput[validationProperty]
    "
    class="text-red-600 text-left"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    formInput: {
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
