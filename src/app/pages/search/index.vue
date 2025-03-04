<template>
  <div>
    <LayoutPageTitle :title="title" />
    <!-- TODO: offer proper search -->
    <div class="flex flex-col gap-4">
      <EventList />
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
  title: Suche
en:
  title: Search
</i18n>
