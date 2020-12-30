<template>
  <div v-if="loading">{{ $t('globalLoading') }}</div>
  <CardAlert
    v-else-if="errorMessage !== undefined"
    :error-message="errorMessage"
  />
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
  },
}
</script>
