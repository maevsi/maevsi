<template>
  <div
    v-if="formInput && !validationFunction(formInput)"
    class="text-yellow-600 text-left"
  >
    <FontAwesomeIcon :icon="['fas', 'exclamation-circle']" />
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
    validationFunction: {
      required: true,
      type: Function,
    },
  },
}
</script>
