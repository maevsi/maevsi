<template>
  <div class="flex w-full items-center rounded-xl bg-white p-2 px-4 shadow">
    <div class="mr-4 flex-shrink-0 text-green-800">
      <IHeroiconsMagnifyingGlass class="h-8 w-8" />
    </div>
    <input
      id="search"
      v-model="localValue"
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
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

export interface Props {
  modelValue: string
  isSearching: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  isSearching: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<i18n lang="yaml">
de:
  search: Suche
en:
  search: Search
</i18n>
