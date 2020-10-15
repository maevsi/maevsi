<template>
  <div>
    <h1>{{ title }}</h1>
    <NewEvent />
  </div>
</template>

<script>
export default {
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
