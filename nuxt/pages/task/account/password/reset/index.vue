<template>
  <div>
    <h1>{{ title }}</h1>
    <FormAccountPasswordReset />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n-composable'

import { defineComponent, reactive, useNuxtApp } from '#app'

import { REGEX_UUID } from '~/plugins/util/validation'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, query, redirect }: Context) {
    if (Array.isArray(query.code) || !REGEX_UUID.test(query.code)) {
      return redirect(app.localePath('/'))
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
  title: Passwort zurücksetzen
en:
  title: Reset password
</i18n>
