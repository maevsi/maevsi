<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <p>It's not yet possible to create new items. Stay tuned!</p>
  </Layout>
</template>

<script>
export default {
  metaInfo () {
    return { title: 'New Items' }
  }
}
</script>
