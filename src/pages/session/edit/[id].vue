<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>
      {{ title }}
    </h1>
    <div>
      <div class="grid grid-cols-2 grid-rows-2 items-center gap-2">
        <label for="vio-color-scheme-select">{{ t('colorScheme') }}</label>
        <ClientOnly>
          <select
            id="vio-color-scheme-select"
            class="form-input pr-8"
            @change="
              colorMode.preference = ($event.target as HTMLInputElement).value
            "
          >
            <option
              v-for="colorScheme in [
                { name: 'system', title: t('colorSchemeSystem') },
                { name: 'light', title: t('colorSchemeLight') },
                { name: 'dark', title: t('colorSchemeDark') },
              ]"
              :key="colorScheme.name"
              :selected="colorMode.preference === colorScheme.name"
              :value="colorScheme.name"
            >
              {{ colorScheme.title }}
            </option>
          </select>
          <template #fallback>
            <select class="form-input" />
          </template>
        </ClientOnly>
        <label for="vio-i18n-select">{{ t('language') }}</label>
        <select
          id="vio-i18n-select"
          class="form-input pr-8"
          @change="onI18nChange"
        >
          <option
            v-for="availableLocale in availableLocales"
            :key="availableLocale"
            :selected="availableLocale === locale"
            :value="availableLocale"
          >
            {{ getLocaleName(availableLocale) }}
          </option>
        </select>
        <label for="vio-cookie-preferences">{{ t('cookies') }}</label>
        <ButtonColored
          id="vio-cookie-preferences"
          :aria-label="t('preferences')"
          :is-primary="false"
          @click="cookieControl.isModalActive.value = true"
        >
          {{ t('preferences') }}
        </ButtonColored>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { LocaleObject } from 'vue-i18n-routing'

import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbSession } from '../view/[id].vue'
import { MODULE_CONFIG } from '~/config/modules/i18n'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

import { type RoutesNamesList } from '@typed-router'

const ROUTE_NAME: RoutesNamesList = 'session-edit-id'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Bearbeiten',
      en: 'Edit',
    },
    to: `/session/edit/${route.params.id}`,
  } as BreadcrumbItemPropsLocalizedObject
}
</script>

<script setup lang="ts">
const { availableLocales, t, locale } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const cookieControl = useCookieControl()
const colorMode = useColorMode()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps([
    usePageBreadcrumbHome(),
    usePageBreadcrumbSession(),
    {
      current: true,
      ...usePageBreadcrumb(),
    },
  ]),
)
const title = t('preferences')

// methods
const getLocaleName = (locale: string) => {
  const locales: LocaleObject[] = MODULE_CONFIG.locales.filter(
    (localeObject) => localeObject.code === locale,
  )

  if (locales.length) {
    return locales[0].name
  } else {
    return undefined
  }
}
const onI18nChange = async (event: Event) =>
  await router.push({
    path: switchLocalePath((event.target as HTMLInputElement).value),
  })

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  colorSchemeDark: Dunkel
  colorSchemeLight: Hell
  colorSchemeSystem: System
  colorScheme: Farbschema
  cookies: Cookies
  language: Sprache
  preferences: Einstellungen
en:
  colorScheme: Color scheme
  colorSchemeDark: Dark
  colorSchemeLight: Light
  colorSchemeSystem: System
  cookies: Cookies
  language: Language
  preferences: Settings
</i18n>
