<template>
  <div>
    <h1>{{ title }}</h1>
    <FormEventNew />
  </div>
</template>

<script>
export default {
  middleware({ app, store, redirect }) {
    if (
      store.state.jwtDecoded &&
      store.state.jwtDecoded.role !== 'maevsi_account'
    ) {
      return redirect(app.localePath('/'))
    }
  },
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
