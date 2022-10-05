<template>
  <div>
    <CardStateInfo
      v-if="routeQueryReferrer && !routeQueryIsRedirectNoticeHidden"
    >
      {{ t('accountRequired') }}
    </CardStateInfo>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountSignIn class="max-w-lg grow" />
    </div>
  </div>
</template>

<script lang="ts">
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const localePath = useLocalePath()
      const route = useRoute()
      const store = useMaevsiStore()

      if (
        store.jwtDecoded?.role === 'maevsi_account' &&
        !Array.isArray(route.query.referrer)
      ) {
        return navigateTo(route.query.referrer || localePath('/dashboard/'))
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const route = useRoute()
    const { t } = useI18n()

    const data = reactive({
      routeQueryReferrer: route.query.referrer,
      routeQueryIsRedirectNoticeHidden: route.query.isRedirectNoticeHidden,
      title: t('title'),
    })
    const methods = {
      t,
    }

    useHeadDefault(data.title)

    return {
      ...data,
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  accountRequired: Melde dich an, um fortzufahren.
  title: Anmelden
en:
  accountRequired: Sign in to continue.
  title: Sign in
</i18n>
