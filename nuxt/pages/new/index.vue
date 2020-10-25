<template>
  <div>
    <h1>{{ title }}</h1>
    <EventNew />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$t('title'),
    }
  },
  head() {
    return { title: this.title }
  },
}
</script>

<i18n lang="yml">
de:
  title: 'Veranstaltung erstellen'
en:
  title: 'Create event'
</i18n>
