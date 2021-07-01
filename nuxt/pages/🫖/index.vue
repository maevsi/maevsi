<template>
  <Error :status-code="418" />
</template>

<script>
export default {
  middleware({ res }) {
    if (res) {
      res.statusCode = 418
    }
  },
  data() {
    return {
      graphqlError: undefined,
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
        {
          hid: 'twitter:title',
          property: 'twitter:title',
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
  title: Ich werd' keinen Kaffe machen
en:
  title: I'll not make coffee
</i18n>
