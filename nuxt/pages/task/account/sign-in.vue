<template>
  <div>
    <CardStateInfo
      v-if="$route.query.referrer && !$route.query.isRedirectNoticeHidden"
    >
      {{ $t('accountRequired') }}
    </CardStateInfo>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountSignIn class="max-w-lg grow" />
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n-composable'

import { defineComponent, reactive, useNuxtApp } from '#app'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, store, redirect, route }: Context): void {
    if (store.getters.jwtDecoded?.role === 'maevsi_account') {
      return redirect(route.query.referrer || app.localePath('/dashboard/'))
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
  accountRequired: Melde dich an, um fortzufahren.
  title: Anmelden
en:
  accountRequired: Sign in to continue.
  title: Sign in
</i18n>
