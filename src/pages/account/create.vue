<template>
  <div>
    <LayoutPageTitle :title="title" :centered="true" />
    <div class="mt-5 flex justify-center">
      <FormAccountRegistration />
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
