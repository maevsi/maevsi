<template>
  <div>
    <h1>{{ this.$metaInfo.title }}</h1>
    <NewEvent />
  </div>
</template>

<script>
import NewEvent from '~/components/NewEvent.vue'

export default {
  components: {
    NewEvent,
  },
  metaInfo() {
    return { title: 'New Items' }
  },
}
</script>
