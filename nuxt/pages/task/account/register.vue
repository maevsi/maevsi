<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountRegistration class="max-w-lg grow" />
    </div>
  </div>
</template>

<script setup lang="ts">
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
  title: Registrieren
en:
  title: Register
</i18n>
