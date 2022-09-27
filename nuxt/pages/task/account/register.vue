<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountRegistration class="max-w-lg grow" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

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
  title: Registrieren
en:
  title: Register
</i18n>
