<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>
      {{ title }}
    </h1>
    <EventList />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

export const usePageBreadcrumb = () =>
  ({
    label: {
      de: 'Veranstaltungen',
      en: 'Events',
    },
    to: '/event',
  }) as BreadcrumbItemPropsLocalizedObject
</script>

<script setup lang="ts">
const { t } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbHome(),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  title: Veranstaltungen entdecken
en:
  title: Explore events
</i18n>
