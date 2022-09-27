<template>
  <div>
    <Breadcrumbs>
      {{ title }}
    </Breadcrumbs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import { navigateTo, useRouter } from '#app'
import { useHead } from '#head'

import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const localePath = useLocalePath()
      const store = useMaevsiStore()

      if (store.jwtDecoded?.role === 'maevsi_account') {
        return navigateTo(localePath('/account/' + store.jwtDecoded.username))
      } else {
        return navigateTo(localePath('/task/account/sign-in'))
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
            router.currentRoute.value.fullPath,
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
