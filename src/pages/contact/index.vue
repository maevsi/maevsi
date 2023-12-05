<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>
      {{ title }}
    </h1>
    <ContactList v-if="store.jwtDecoded?.role === 'maevsi_account'" />
    <LayoutCallToAction
      v-else
      :call-to-action="t('anonymousCta')"
      :call-to-action-description="t('anonymousCtaDescription')"
    />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'

import { helpers } from '@typed-router'

export const usePageBreadcrumb = () => {
  return {
    label: {
      de: 'Kontakte',
      en: 'Contacts',
    },
    to: helpers.path('/contact'),
  }
}
</script>

<script setup lang="ts">
const store = useMaevsiStore()
const { t } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps([
    usePageBreadcrumbHome(),
    {
      current: true,
      ...usePageBreadcrumb(),
    },
  ]),
)
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  anonymousCta: Finde sie auf maevsi
  anonymousCtaDescription: Wo sind deine Freunde?
  title: Kontaktbuch
en:
  anonymousCta: Find them on maevsi
  anonymousCtaDescription: Where are your friends?
  title: Contact book
</i18n>
