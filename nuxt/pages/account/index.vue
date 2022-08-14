<template>
  <div>
    <Breadcrumbs>
      {{ title }}
    </Breadcrumbs>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n-composable'

import { defineComponent, reactive, useNuxtApp } from '#app'

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
  title: Konten
en:
  title: accounts
</i18n>
