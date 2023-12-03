<template>
  <SBreadcrumb :items="items" :ui="BREADCRUMBS_UI">
    <template #icon>
      <IHeroiconsHome />
    </template>
  </SBreadcrumb>
</template>

<script setup lang="ts">
import type { BreadcrumbItemProps } from 'nuxt-seo-ui'

export interface Props {
  items: (string | BreadcrumbItemProps)[]
}
withDefaults(defineProps<Props>(), {})
</script>
