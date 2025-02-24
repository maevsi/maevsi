<template>
  <UnderConstruction>
    <div class="flex">
      <label class="hidden" for="search">{{ t('search') }}</label>
      <input
        id="search"
        v-model="searchTerm"
        class="form-input cursor-text rounded-r-none dark:border-gray-500 dark:bg-gray-700 dark:placeholder:text-gray-300"
        :placeholder="t('search')"
        type="text"
        @keyup.enter="handleSearch"
      />
      <span
        class="inline-flex cursor-pointer items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300"
        @click="handleSearch"
      >
        <IHeroiconsMagnifyingGlass />
      </span>
    </div>
  </UnderConstruction>
</template>

<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits(['search'])

// state
const searchTerm = ref('')

// methods
const handleSearch = () => {
  emit('search', searchTerm.value)
}
</script>

<i18n lang="yaml">
de:
  search: Suche
en:
  search: Search
</i18n>
