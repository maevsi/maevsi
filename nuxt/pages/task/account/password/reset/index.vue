<template>
  <div>
    <h1>{{ title }}</h1>
    <FormAccountPasswordReset />
  </div>
</template>

<script setup lang="ts">
import { REGEX_UUID } from '~/plugins/util/validation'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const { $localePath } = useNuxtApp()
      const route = useRoute()

      if (
        Array.isArray(route.query.code) ||
        route.query.code === null ||
        !REGEX_UUID.test(route.query.code)
      ) {
        return navigateTo($localePath('/'))
      }
    },
  ],
})

// uses
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
  title: Passwort zurücksetzen
en:
  title: Reset password
</i18n>
