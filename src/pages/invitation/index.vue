<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <LayoutPageTitle :title="title" :to="localePath('/dashboard')" />
    <CardStateInfo>
      {{ t('soon') }}
    </CardStateInfo>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

export const usePageBreadcrumb = () =>
  ({
    label: {
      de: 'Einladungen',
      en: 'Invitations',
    },
    to: '/invitation',
  }) as BreadcrumbItemPropsLocalizedObject
</script>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
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
</script>

<i18n lang="yaml">
de:
  soon: Hier wirst du bald sehen können, zu welchen Veranstaltungen du eingeladen bist.
  title: Einladungen
en:
  soon: Here, you will soon be able to see which events you are invited to.
  title: Invitations
</i18n>
