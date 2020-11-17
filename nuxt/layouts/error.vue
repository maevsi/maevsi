<template>
  <Error :status-code="+error.statusCode" />
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: undefined,
    },
  },
  head() {
    return { title: this.error.statusCode }
  },
}
</script>
