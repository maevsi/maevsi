<template>
  <div>
    <h1>{{ title }}</h1>
    <FormEvent />
  </div>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    () => {
      const store = useMaevsiStore()
      const localePath = useLocalePath()

      if (store.jwtDecoded?.role !== 'maevsi_account') {
        return navigateTo(localePath('/task/account/sign-in'))
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

<i18n lang="yaml">
de:
  title: Veranstaltung erstellen
en:
  title: Create event
</i18n>
