<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <EventList />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

import { useRouter } from '#app'
import { useHead } from '#head'

import { useMaevsiStore } from '~/store'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const store = useMaevsiStore()

    const data = reactive({
      title: t('title'),
    })
    const computations = {
      signedIn: computed(() => {
        return (
          store.jwtDecoded?.role === 'maevsi_account' &&
          store.jwtDecoded?.exp &&
          store.jwtDecoded.exp > Math.floor(Date.now() / 1000)
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
      ...computations,
    }
  },
})
</script>

<i18n lang="yml">
de:
  title: Veranstaltungen entdecken
en:
  title: Explore events
</i18n>
