<template>
  <div>
    <h1>{{ title }}</h1>
    <FormEvent />
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n-composable'

import { defineComponent, reactive, useNuxtApp } from '#app'
import { useHead } from '#head'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, store, redirect, route }) {
    if (store.getters.jwtDecoded?.role !== 'maevsi_account') {
      return redirect(
        app.localePath({
          path: '/task/account/sign-in',
          query: { referrer: route.fullPath },
        })
      )
    }
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { $router } = useNuxtApp()
    const { t } = useI18n()

    const data = reactive({
      title: t('title'),
    })

    useHead({
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: data.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            $router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: data.title,
        },
      ],
      title: data.title,
    })

    return {
      ...data,
    }
  },
})
</script>

<i18n lang="yml">
de:
  title: Veranstaltung erstellen
en:
  title: Create event
</i18n>
