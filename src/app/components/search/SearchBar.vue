<template>
  <div
    class="flex items-center gap-4 rounded-lg border-1 border-(--faint-line) bg-(--semantic-base-input-field-fill) px-4 py-3 shadow hover:bg-(--faint-weak) has-focus:border-(--accent-line) has-focus:bg-(--semantic-base-input-field-fill) dark:border-(--semantic-base-line) dark:has-focus:border-(--semantic-base-line)"
  >
    <div class="flex-shrink-0 text-(--semantic-accent-accent-icon)">
      <IHeroiconsMagnifyingGlass :alt="t('iconSearch')" class="h-6 w-6" />
    </div>
    <!-- TODO: extract input component, e.g. to set placeholder color in one place only -->
    <input
      id="search"
      v-model="model"
      class="peer flex-grow border-none bg-transparent placeholder-(--semantic-base-text-secondary) ring-0"
      :placeholder="t('search')"
      type="text"
    />
    <ButtonIcon
      :aria-label="t('close')"
      class="hidden flex-shrink-0 text-(--semantic-accent-accent-icon) peer-not-placeholder-shown:block"
      @click="model = ''"
    >
      <IVibetypeClose :alt="t('iconClose')" class="h-6 w-6" />
    </ButtonIcon>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const model = defineModel<string | undefined>({ required: true })
</script>

<i18n lang="yaml">
de:
  close: Eingabe zurücksetzen
  iconClose: Schließen-Symbol
  iconSearch: Such-Icon
  search: Suche
en:
  close: Reset input
  iconClose: Close icon
  iconSearch: Search icon
  search: Search
</i18n>
