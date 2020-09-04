<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <NewEvent />
  </Layout>
</template>

<script>
import NewEvent from '~/components/NewEvent.vue'

export default {
  components: {
    NewEvent
  },
  metaInfo () {
    return { title: 'New Items' }
  }
}
</script>
