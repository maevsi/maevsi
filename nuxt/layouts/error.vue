<template>
  <Error :status-code="+error.statusCode" />
</template>

<script>
export default {
  props: {
    error: {
      default: undefined,
      type: Object,
    },
  },
  head() {
    return { title: this.error.statusCode }
  },
}
</script>
