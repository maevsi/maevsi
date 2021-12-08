<template>
  <div>
    <h1>{{ title }}</h1>
    <EventList :username="$route.params.username" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  name: 'IndexPage',
  validate({ app, params }) {
    return app.$util.REGEX_SLUG.test(params.username)
  },
  data() {
    return {
      title: this.$t('title', { username: this.$route.params.username }),
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
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
          content: title,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
    }
  },
})
</script>

<i18n lang="yml">
de:
  title: Veranstaltungen von {username}
en:
  title: Events by {username}
</i18n>
