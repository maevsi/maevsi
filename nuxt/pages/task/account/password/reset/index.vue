<template>
  <div>
    <h1>{{ title }}</h1>
    <FormAccountPasswordReset />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    defineNuxtRouteMiddleware((to) => {
      const localePath = useLocalePath()

      if (
        Array.isArray(to.query.code) ||
        to.query.code === null ||
        !REGEX_UUID.test(to.query.code)
      ) {
        return navigateTo(localePath('/'))
      }
    }),
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
  title: Passwort zurücksetzen
en:
  title: Reset password
</i18n>
