<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <p>It's not yet possible to view an event overview. Stay tuned!</p>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return { title: "Events" };
  }
};
</script>