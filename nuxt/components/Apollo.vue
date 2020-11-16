<template>
  <div>
    <div v-if="$apollo.loading">{{ $t('globalApolloLoading') }}</div>
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
  },
}
</script>
