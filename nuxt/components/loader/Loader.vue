<template>
  <CardAlert v-if="errorMessage !== undefined" :error-message="errorMessage" />
  <div v-else-if="loading">
    <LoaderIndicatorPulse v-if="loadingIndicator === 'pulse'" />
    <LoaderIndicatorSpinner v-else-if="loadingIndicator === 'spinner'" />
    <LoaderIndicatorText v-else-if="loadingIndicator === 'text'" />
    <LoaderIndicatorText v-else />
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: undefined,
    },
    loadingIndicator: {
      type: String,
      default: undefined,
    },
  },
}
</script>
