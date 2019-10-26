<template>
  <Layout>
    <h1>{{ $route.params.event_series }}</h1>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {title: this.$route.params.event_series}
  }
}
</script>