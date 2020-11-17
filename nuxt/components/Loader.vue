<template>
  <div>
    <div v-if="loading">{{ $t('globalLoading') }}</div>
    <AlertGraphql
      v-else-if="graphqlErrorMessage !== undefined"
      :graphql-error-message="graphqlErrorMessage"
    />
    <slot v-else />
  </div>
</template>

<script>
export default {
  props: {
    graphqlErrorMessage: {
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
