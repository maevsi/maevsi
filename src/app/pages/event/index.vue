<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <EventSearch />
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
  title: Entdecken
en:
  title: Discover
</i18n>
