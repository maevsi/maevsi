<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>{{ title }}</h1>
    <CardStateInfo>
      {{ t('filterSoon') }}
    </CardStateInfo>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from './index.vue'

import { helpers } from '@typed-router'

export const usePageBreadcrumb = () => {
  return {
    label: {
      de: 'Suche',
      en: 'Search',
    },
    to: helpers.path('/search'),
  }
}
</script>

<script setup lang="ts">
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
  filterSoon: Es wird bald möglich sein, nach Veranstaltungen oder Nutzern zu suchen.
  title: Suche
en:
  filterSoon: It will soon be possible to search for events or users.
  title: Search
</i18n>
