<template>
  <div>
    <LayoutPageTitle :title="title" />
    <ClientOnly>
      <!-- <IHeroiconsComputerDesktop v-if="colorScheme.id === 'system'" />
      <IHeroiconsSun v-else-if="colorScheme.id === 'light'" />
      <IHeroiconsMoon v-else-if="colorScheme.id === 'dark'" />
      <IHeroiconsBugAnt v-else /> -->
      <FormRadioButtonTailwind
        :model="colorMode.preference"
        :options="colorSchemes"
        @change="(value) => (colorMode.preference = value)"
      />
      <template #placeholder>
        <FormRadioButtonTailwind :options="colorSchemes" />
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

// data
const title = t('title')
const colorSchemes = [
  { id: 'system', name: t('colorSchemeSystem') },
  { id: 'light', name: t('colorSchemeLight') },
  {
    id: 'dark',
    name: t('colorSchemeDark'),
  },
]
</script>

<i18n lang="yaml">
de:
  colorSchemeDark: Dunkel
  colorSchemeLight: Hell
  colorSchemeSystem: System
  title: Farbschema
en:
  colorSchemeDark: Dark
  colorSchemeLight: Light
  colorSchemeSystem: System
  title: Color scheme
</i18n>
