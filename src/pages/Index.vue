<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <p>A manager for events supported by invitees.</p>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return { title: "Welcome!" };
  }
};
</script>
