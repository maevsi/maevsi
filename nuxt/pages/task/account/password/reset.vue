<template>
  <div>
    <h1>{{ title }}</h1>
    <FormAccountPasswordReset />
  </div>
</template>

<script>
export default {
  middleware({ app, query, redirect }) {
    if (!app.$global.REGEX_UUID.test(query.code)) {
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
  title: 'Passwort zurücksetzen'
en:
  title: 'Reset password'
</i18n>
