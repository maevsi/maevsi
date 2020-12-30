<template>
  <div
    v-if="
      errorMessage !== null &&
      (validationObject === undefined || !validationObject.$anyDirty)
    "
    class="card bg-red-100 border border-red-700 text-center text-red-700"
    role="alert"
  >
    <span>
      {{ 'Error: ' + errorMessage }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
    validationObject: {
      type: Object,
      default: undefined,
    },
  },
}
</script>
