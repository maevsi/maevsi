<template>
  <div>
    <h1>{{ title }}</h1>
    <CardStateInfo>
      {{ t('filterSoon') }}
    </CardStateInfo>
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
  filterSoon: Es wird bald möglich sein, nach Veranstaltungen oder Nutzern zu suchen.
  title: Suchergebnisse
en:
  filterSoon: It will soon be possible to search for events or users.
  title: Search results
</i18n>
