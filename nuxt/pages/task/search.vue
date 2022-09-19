<template>
  <div>
    <h1>{{ title }}</h1>
    <CardStateInfo>
      {{ t('filterSoon') }}
    </CardStateInfo>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRouter } from '#app'
import { useHead } from '#head'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter()
    const { t } = useI18n()

    const data = reactive({
      title: t('title'),
    })
    const methods = {
      t,
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
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  filterSoon: Es wird bald möglich sein, nach Veranstaltungen oder Nutzern zu suchen.
  title: Suchergebnisse
en:
  filterSoon: It will soon be possible to search for events or users.
  title: Search results
</i18n>
