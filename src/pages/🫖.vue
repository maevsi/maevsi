<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <Error :status-code="418" />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from './index.vue'

import { helpers } from '@typed-router/__helpers'

const ROUTE_NAME = '/%F0%9F%AB%96'

export const usePageBreadcrumb = () => {
  const localePath = useLocalePath()

  return {
    label: '🫖',
    to: helpers.route(localePath(ROUTE_NAME)),
  }
}
</script>

<script setup lang="ts">
const { t, locale } = useI18n()
const { ssrContext } = useNuxtApp() // cannot use `useRequestEvent` instead
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

// methods
const init = () => {
  if (ssrContext) {
    ssrContext.event.node.res.statusCode = 418
  }
}

// initialization
useHeadDefault({ title })
init()
</script>

<i18n lang="yaml">
de:
  title: Ich werd' keinen Kaffe machen
en:
  title: I won't make coffee
</i18n>
