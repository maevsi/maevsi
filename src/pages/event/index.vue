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

import { helpers } from '@typed-router/__helpers'

export const usePageBreadcrumb = () => {
  const localePath = useLocalePath()

  return {
    label: {
      de: 'Veranstaltungen',
      en: 'Events',
    },
    to: helpers.route(localePath('/event')),
  }
}
</script>

<script setup lang="ts">
const { t, locale } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps(
    [
      usePageBreadcrumbHome(),
      {
        current: true,
        ...usePageBreadcrumb(),
      },
    ],
    locale,
  ),
)
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
