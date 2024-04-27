<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <Error :status-code="418" />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'
import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

export const usePageBreadcrumb = () =>
  ({
    label: '🫖',
    to: '/%F0%9F%AB%96',
  }) as BreadcrumbLinkLocalized
</script>

<script setup lang="ts">
const { t } = useI18n()
const { ssrContext } = useNuxtApp() // cannot use `useRequestEvent` instead
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
