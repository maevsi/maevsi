<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountRegistration class="max-w-lg grow" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// data
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  title: Registrieren
en:
  title: Register
</i18n>
