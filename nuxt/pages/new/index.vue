<template>
  <div>
    <h1>{{ title }}</h1>
    <NewEvent />
  </div>
</template>

<script>
import NewEvent from '~/components/NewEvent.vue'

export default {
  components: {
    NewEvent,
  },
  data() {
    return {
      title: 'New Items',
    }
  },
  head() {
    return { title: this.title }
  },
}
</script>
