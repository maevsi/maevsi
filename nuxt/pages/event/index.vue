<template>
  <div>
    <h1>{{ title }}</h1>
    <EventList />
  </div>
</template>

<script>
export default {
  data() {
    return {
      graphqlErrorMessage: undefined,
      title: this.$t('title'),
    }
  },
  head() {
    return { title: this.title }
  },
  computed: {
    signedIn() {
      return (
        this.$store.state.jwtDecoded &&
        this.$store.state.jwtDecoded.role === 'maevsi_account' &&
        this.$store.state.jwtDecoded.exp > Math.floor(Date.now() / 1000)
      )
    },
  },
}
</script>

<i18n lang="yml">
de:
  title: Veranstaltungen
en:
  title: Events
</i18n>
