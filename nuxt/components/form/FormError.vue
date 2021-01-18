<template>
  <div
    v-if="form.$error && !form[validationProperty]"
    class="text-red-600 text-left"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    form: {
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
