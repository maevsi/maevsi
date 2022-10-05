<template>
  <div>
    <Breadcrumbs>
      {{ title }}
    </Breadcrumbs>
  </div>
</template>

<script lang="ts">
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
  title: Konten
en:
  title: accounts
</i18n>
