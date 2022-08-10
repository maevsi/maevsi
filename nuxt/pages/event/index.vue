<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <EventList />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, useNuxtApp } from '#app'
import { useMaevsiStore } from '~/store'

export default defineComponent({
  name: 'IndexPage',
  transition: {
    name: 'layout',
  },
  setup() {
    const { $t } = useNuxtApp()
    const store = useMaevsiStore()

    const data = reactive({
      title: $t('title') as string,
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

    return {
      ...data,
      ...computations,
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
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
