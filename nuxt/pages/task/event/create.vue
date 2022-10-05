<template>
  <div>
    <h1>{{ title }}</h1>
    <FormEvent />
  </div>
</template>

<script lang="ts">
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const { $localePath } = useNuxtApp()
      const route = useRoute()
      const store = useMaevsiStore()

      if (store.jwtDecoded?.role !== 'maevsi_account') {
        return navigateTo(
          $localePath({
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
    const { t } = useI18n()

    const data = reactive({
      title: t('title'),
    })

    useHeadDefault(data.title)

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
