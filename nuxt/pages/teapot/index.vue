<template>
  <Error :status-code="418" />
</template>

<script>
export default {
  middleware({ res }) {
    res.statusCode = 418
  },
  head() {
    return {
      title: '🍵',
    }
  },
}
</script>
