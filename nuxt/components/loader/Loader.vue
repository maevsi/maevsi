<template>
  <CardAlert
    v-if="errorMessage !== undefined"
    :error-message="String(errorMessage)"
  />
  <LoaderIndicatorPing v-else-if="indicator === 'ping'" />
  <LoaderIndicatorSpinner v-else-if="indicator === 'spinner'" />
  <LoaderIndicatorText v-else-if="indicator === 'text'" />
  <LoaderIndicatorText v-else />
</template>

<script>
export default {
  props: {
    errorMessage: {
      default: undefined,
      type: String,
    },
    indicator: {
      default: undefined,
      type: String,
    },
  },
}
</script>
