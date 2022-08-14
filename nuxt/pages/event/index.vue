<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <EventList />
  </div>
</template>

<script lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n-composable'

import { computed, defineComponent, reactive, useNuxtApp } from '#app'

export default defineComponent({
  name: 'IndexPage',
  transition: {
    name: 'layout',
  },
  setup() {
    const { $router, $store } = useNuxtApp()
    const { t } = useI18n()

    const data = reactive({
      title: t('title'),
    })
    const computations = {
      signedIn: computed(() => {
        return (
          $store.getters.jwtDecoded?.role === 'maevsi_account' &&
          $store.getters.jwtDecoded?.exp > Math.floor(Date.now() / 1000)
        )
      }),
    }

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
      ...computations,
    }
  },
})
</script>

<i18n lang="yml">
de:
  title: Veranstaltungen
en:
  title: Events
</i18n>
