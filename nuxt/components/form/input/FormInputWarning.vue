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
  mounted() {
    console.log('input:' + this.formInput)
    console.log('func:' + this.validationFunction(this.formInput))
  },
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
