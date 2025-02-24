<template>
  <div>
    <LayoutPageTitle :title="title" />
    <div class="flex flex-col gap-4">
      <SearchBar @search="handleSearch" />
      <EventList />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// data
const title = t('title')
const searchTerm = ref('')

// methods
const handleSearch = (term: string) => {
  searchTerm.value = term
}

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  title: Suche
en:
  title: Search
</i18n>
