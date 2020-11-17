<template>
  <div>
    <h1>{{ title }}</h1>
    <FormAccountPasswordReset />
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
  middleware({ app, query, redirect }) {
    if (!app.$global.REGEX_UUID.test(query.code)) {
      return redirect(app.localePath('/'))
    }
  },
}
</script>

<i18n lang="yml">
de:
  title: 'Passwort zurücksetzen'
en:
  title: 'Reset password'
</i18n>
