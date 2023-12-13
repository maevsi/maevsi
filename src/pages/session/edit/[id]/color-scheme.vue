<template>
  <div>
    <LayoutPageTitle
      :title="title"
      :to="localePath(`/session/edit/${route.params.id}`)"
    />
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
import type { RoutesNamesList } from '@typed-router'

const ROUTE_NAME: RoutesNamesList = 'session-edit-id-language'

const colorMode = useColorMode()
const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
const localePath = useLocalePath()

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
