<template>
  <div
    v-if="formInput.$model && !formInput.$invalid"
    class="text-green-600 text-left"
  >
    <FontAwesomeIcon
      v-if="formInput && validationProperty"
      :icon="['fas', 'check-circle']"
    />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    formInput: {
      required: true,
      type: Object,
    },
  },
}
</script>
