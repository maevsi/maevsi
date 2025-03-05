<template>
  <div
    class="flex w-full items-center gap-4 rounded-lg bg-white px-4 py-3 shadow"
  >
    <div class="flex-shrink-0 text-green-800">
      <IHeroiconsMagnifyingGlass class="h-8 w-8" />
    </div>
    <input
      id="search"
      v-model="model"
      class="w-full border-none bg-transparent text-xl text-gray-600 placeholder-gray-400 outline-none focus:ring-0 focus:outline-none"
      :placeholder="t('search')"
      type="text"
    />
    <IHeroiconsArrowPath
      v-if="isSearching"
      class="h-5 w-5 animate-spin text-gray-400"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

export interface Props {
  isSearching?: boolean
}
withDefaults(defineProps<Props>(), {
  isSearching: undefined,
})

const model = defineModel<string | undefined>({ required: true })
</script>

<i18n lang="yaml">
de:
  search: Suche
en:
  search: Search
</i18n>
