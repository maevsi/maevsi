<template>
  <div>
    <Breadcrumbs>
      {{ title }}
    </Breadcrumbs>
  </div>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const { $localePath } = useNuxtApp()
      const store = useMaevsiStore()

      if (store.jwtDecoded?.role === 'maevsi_account') {
        return navigateTo($localePath('/account/' + store.jwtDecoded.username))
      } else {
        return navigateTo($localePath('/task/account/sign-in'))
      }
    },
  ],
})

const { t } = useI18n()

// data
const title = t('title')

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
  title: Konten
en:
  title: accounts
</i18n>
