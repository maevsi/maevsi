<template>
  <div>
    <h1>{{ $route.params.event_group_name }}</h1>
    <p>It's not yet possible to view event groups. Stay tuned!</p>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return { title: this.$route.params.event_group_name }
  },
  validate({ params }) {
    // Must be a number
    return /^[-A-Za-z0-9]+$/.test(params.id)
  },
}
</script>
