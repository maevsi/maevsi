<template>
  <div>
    <h1>{{ title }}</h1>
    <FormAccountPasswordReset />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'

import { defineComponent } from '#app'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, query, redirect }: Context) {
    if (Array.isArray(query.code) || !app.$util.REGEX_UUID.test(query.code)) {
      return redirect(app.localePath('/'))
    }
  },
  data() {
    return {
      title: this.$t('title'),
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
  title: Passwort zurücksetzen
en:
  title: Reset password
</i18n>
