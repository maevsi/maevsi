<template>
  <Error404 />
</template>

<script>
import Error404 from '~/components/Error404.vue'

export default {
  components: {
    Error404,
  },
  head() {
    return { title: '404' }
  },
}
</script>
