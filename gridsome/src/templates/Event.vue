<template>
  <Layout>
    <h1>{{ $route.params.event_name }}</h1>
    <p>It's not yet possible to view events. Stay tuned!</p>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return { title: this.$route.params.event_name };
  }
};
</script>