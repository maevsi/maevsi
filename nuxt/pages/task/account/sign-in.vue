<template>
  <div>
    <CardStateInfo v-if="routeQueryReferrer">
      {{ t('accountRequired') }}
    </CardStateInfo>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountSignIn class="max-w-lg grow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const { $localePath } = useNuxtApp()
      const route = useRoute()
      const store = useMaevsiStore()

      if (
        store.jwtDecoded?.role === 'maevsi_account' &&
        !Array.isArray(route.query.referrer)
      ) {
        return navigateTo(route.query.referrer || $localePath('/dashboard/'))
      }
    },
  ],
})

const route = useRoute()
const { t } = useI18n()

// data
const title = t('title')

// computations
const routeQueryReferrer = computed(() => route.query.referrer)

// initialization
useHeadDefault(title)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yml">
de:
  accountRequired: Melde dich an, um fortzufahren.
  title: Anmelden
en:
  accountRequired: Sign in to continue.
  title: Sign in
</i18n>
