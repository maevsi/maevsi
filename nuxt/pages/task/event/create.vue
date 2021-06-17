<template>
  <div>
    <h1>{{ title }}</h1>
    <FormEvent />
  </div>
</template>

<script>
export default {
  middleware({ app, store, redirect, route }) {
    if (
      store.state.jwtDecoded &&
      store.state.jwtDecoded.role !== 'maevsi_account'
    ) {
      return redirect(
        app.localePath({
          path: '/account',
          query: { referrer: route.fullPath },
        })
      )
    }
  },
  data() {
    return {
      title: this.$t('title'),
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
      ],
      title: this.title,
    }
  },
}
</script>

<i18n lang="yml">
de:
  title: Veranstaltung erstellen
en:
  title: Create event
</i18n>
