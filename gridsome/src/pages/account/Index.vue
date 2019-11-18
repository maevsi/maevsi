<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <p>It's not yet possible to access accounts. Stay tuned!</p>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return { title: "Account" };
  }
};
</script>
