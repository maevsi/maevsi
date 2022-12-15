<template>
  <div>
    <h1>{{ title }}</h1>
    <FormAccountPasswordResetRequest />
  </div>
</template>

<script setup lang="ts">
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
