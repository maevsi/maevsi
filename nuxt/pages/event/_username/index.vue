<template>
  <EventList :username="$route.params.username" />
</template>

<script>
export default {
  validate({ app, params }) {
    return app.$global.REGEX_SLUG.test(params.username)
  },
  data() {
    return {
      title: this.$t('title', { username: this.$route.params.username }),
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
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'profile',
        },
        {
          hid: 'profile:username',
          property: 'profile:username',
          content: this.title,
        },
      ],
      title: this.title,
    }
  },
}
</script>

<i18n lang="yml">
de:
  title: Veranstaltungen von {username}
en:
  title: Events by {username}
</i18n>
