<template>
  <div>
    <h1>{{ title }}</h1>
    <FormAccountPasswordReset v-if="isCodeValid" />
    <Error v-else :status-code="422" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

// data
const title = t('title')

// computations
const isCodeValid = computed(
  () =>
    route.query.code &&
    !Array.isArray(route.query.code) &&
    REGEX_UUID.test(route.query.code),
)

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  title: Passwort zurücksetzen
en:
  title: Reset password
</i18n>
