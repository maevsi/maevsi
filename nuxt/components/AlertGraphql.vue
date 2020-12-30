<template>
  <div
    v-if="
      graphqlErrorMessage !== null &&
      (validationObject === undefined || !validationObject.$anyDirty)
    "
    class="bg-red-100 border border-red-400 mt-4 px-3 py-4 relative rounded text-red-700"
    role="alert"
  >
    <span>
      {{ 'Error: ' + graphqlErrorMessage.replace('GraphQL error: ', '') }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    graphqlErrorMessage: {
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
