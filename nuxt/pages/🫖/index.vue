<template>
  <Error :status-code="418" />
</template>

<script lang="ts">
import { definePageMeta } from 'nuxt/dist/pages/runtime/composables'
import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRouter } from '#app'
import { useHead } from '#head'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const store = useMaevsiStore()

      if (res) {
        res.statusCode = 418
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
  title: Ich werd' keinen Kaffe machen
en:
  title: I'll not make coffee
</i18n>
