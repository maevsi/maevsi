<template>
  <div class="flex flex-col gap-4">
    <!-- TODO: fill page with content instead (https://github.com/maevsi/maevsi/issues/1264) -->
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <CardStateInfo>
      {{ t('accountDescription') }}
    </CardStateInfo>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'

import { helpers } from '@typed-router'

export const usePageBreadcrumb = () => {
  const localePath = useLocalePath()

  return {
    label: {
      de: 'Konten',
      en: 'Accounts',
    },
    to: helpers.route(localePath('/account')),
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
  accountDescription: Hier wirst du bald interessante Veranstalter entdecken können.
  title: Konten
en:
  accountDescription: Here you will soon be able to discover interesting event organizers.
  title: accounts
</i18n>
