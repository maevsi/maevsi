<template>
  <Layout>
    <h1>{{ $route.params.event_group_name }}</h1>
    <p>It's not yet possible to view event groups. Stay tuned!</p>
  </Layout>
</template>

<script>
export default {
  metaInfo () {
    return { title: this.$route.params.event_group_name }
  }
}
</script>
