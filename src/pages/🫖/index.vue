<template>
  <div>
    <SBreadcrumb :items="breadcrumbItems" :ui="BREADCRUMBS_UI" />
    <Error :status-code="418" />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'

export const usePageBreadcrumb = () => ({
  label: '🫖',
  to: '/🫖',
})
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
