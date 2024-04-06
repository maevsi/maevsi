<template>
  <UnderConstruction>
    <div class="flex">
      <label class="hidden" for="search">{{ t('search') }}</label>
      <input
        id="search"
        class="form-input cursor-pointer rounded-r-none dark:border-gray-500 dark:bg-gray-700 dark:placeholder:text-gray-300"
        :placeholder="t('search')"
        readonly
        type="text"
        @click="navigateToSearch"
      />
      <span
        class="inline-flex cursor-pointer items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300"
        @click="navigateToSearch"
      >
        <IHeroiconsMagnifyingGlass />
      </span>
    </div>
  </UnderConstruction>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

// methods
const navigateToSearch = () => {
  navigateTo(localePath({ path: `/search`, query: { q: 'search phrase' } }))
}
</script>

<i18n lang="yaml">
de:
  search: Suche
en:
  search: Search
</i18n>
