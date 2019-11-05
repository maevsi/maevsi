<template>
  <Layout>
    <h1>{{ $route.params.account_name }}</h1>
    <p>It's not yet possible to view accounts. Stay tuned!</p>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return { title: this.$route.params.account_name };
  }
};
</script>