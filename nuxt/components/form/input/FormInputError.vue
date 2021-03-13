<template>
  <div
    v-if="
      (!formInput && !validationProperty) ||
      (formInput.$error &&
        validationProperty in formInput &&
        !formInput[validationProperty])
    "
    class="text-red-600 text-left"
  >
    <FontAwesomeIcon
      v-if="formInput && validationProperty"
      :icon="['fas', 'exclamation-circle']"
    />
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
