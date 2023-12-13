<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>{{ title }}</h1>
    <!-- TODO: offer proper search -->
    <EventList />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from './index.vue'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

export const usePageBreadcrumb = () =>
  ({
    label: {
      de: 'Suche',
      en: 'Search',
    },
    to: '/search',
  }) as BreadcrumbItemPropsLocalizedObject
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
  title: Suche
en:
  title: Search
</i18n>
