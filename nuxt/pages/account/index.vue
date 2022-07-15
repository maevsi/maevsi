<template>
  <div>
    <Breadcrumbs>
      {{ title }}
    </Breadcrumbs>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'

import { defineComponent } from '#app'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, store, redirect }: Context): void {
    if (store.getters.jwtDecoded?.role === 'maevsi_account') {
      return redirect(
        app.localePath('/account/' + store.getters.jwtDecoded.username)
      )
    } else {
      return redirect(app.localePath('/task/account/sign-in'))
    }
  },
  transition: {
    name: 'layout',
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
  title: Konten
en:
  title: accounts
</i18n>
