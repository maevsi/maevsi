<template>
  <div
    v-if="graphqlErrorMessage !== undefined && !validationObject.$dirty"
    class="alert"
    role="alert"
  >
    <span>
      {{ "Error: " + graphqlErrorMessage.substr(15) }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    graphqlErrorMessage: {
      type: String,
      default: undefined
    },
    validationObject: {
      type: Object,
      default: undefined
    }
  }
}
</script>
