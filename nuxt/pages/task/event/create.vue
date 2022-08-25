<template>
  <div>
    <h1>{{ title }}</h1>
    <FormEvent />
  </div>
</template>

<script lang="ts">
import { definePageMeta } from 'nuxt/dist/pages/runtime/composables'
import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRouter, navigateTo, useRoute, useNuxtApp } from '#app'
import { useHead } from '#head'

import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const { localePath } = useNuxtApp()
      const route = useRoute()
      const store = useMaevsiStore()

      if (store.jwtDecoded?.role !== 'maevsi_account') {
        return navigateTo(
          localePath({
            path: '/task/account/sign-in',
            query: { referrer: route.fullPath },
          })
        )
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter()
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
            router.currentRoute.fullPath,
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
