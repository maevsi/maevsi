<template>
  <CardAlert v-if="errorMessage !== undefined" :error-message="errorMessage" />
  <LoaderIndicatorPing v-else-if="indicator === 'ping'" />
  <LoaderIndicatorSpinner v-else-if="indicator === 'spinner'" />
  <LoaderIndicatorText v-else-if="indicator === 'text'" />
  <LoaderIndicatorText v-else />
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: undefined,
    },
    indicator: {
      type: String,
      default: undefined,
    },
  },
}
</script>
