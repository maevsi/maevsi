<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>{{ title }}</h1>
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
      de: 'Benachrichtigungen',
      en: 'Notifications',
    },
    to: '/notification',
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
const title = t('notifications')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  notifications: Benachrichtigungen
  soon: Hier wirst du bald alles im Blick behalten können, was du nicht verpassen möchtest.
en:
  notifications: Notifications
  soon: Here, you will soon be able to see what you don't want to miss out on.
</i18n>
