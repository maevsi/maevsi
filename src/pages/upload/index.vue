<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>{{ title }}</h1>
    <!-- "UploadGallery" must come after "ModalUploadSelection" for them to overlay properly! -->
    <UploadGallery v-if="store.jwtDecoded?.role === 'maevsi_account'" />
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
      de: 'Dateien',
      en: 'Files',
    },
    to: helpers.path('/upload'),
  }
}
</script>

<script setup lang="ts">
const { t } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const store = useMaevsiStore()

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
  anonymousCtaDescription: Gibt es Fotos von dir und deinen Freunden?
  title: Bildgalerie
en:
  anonymousCta: Find them on maevsi
  anonymousCtaDescription: Are there photos of you and your friends?
  title: Image gallery
</i18n>
