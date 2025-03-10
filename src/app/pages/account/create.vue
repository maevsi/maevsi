<template>
  <div>
    <LayoutPageTitle is-centered :title="title" />
    <div class="flex justify-center">
      <FormAccountRegistration class="max-w-sm grow" />
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
  title: Create an account
</i18n>
