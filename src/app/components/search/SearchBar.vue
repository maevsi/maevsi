<template>
  <div
    :class="[
      'hover:bg-faint-weak flex w-full items-center gap-4 rounded-lg px-4 py-3 shadow',
      { 'ring-accent-line bg-white ring-1': isInputFocused },
    ]"
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
      @focus="isInputFocused = true"
      @blur="isInputFocused = false"
    />
    <IMaevsiColoredCloseIcon
      v-if="model && model.length > 0"
      class="h-6 w-6"
      :alt="t('iconAltClose')"
      @click="model = ''"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const isInputFocused = ref(false)
const model = defineModel<string | undefined>({ required: true })
</script>

<i18n lang="yaml">
de:
  iconAltClose: Schließen-Symbol
  search: Suche
en:
  iconAltClose: Close icon
  search: Search
</i18n>
