<template>
  <div class="flex flex-col gap-4">
    <!-- TODO: fill page with content instead (https://github.com/maevsi/maevsi/issues/1264) -->
    <SBreadcrumb :items="breadcrumbItems" :ui="BREADCRUMBS_UI" />
    <CardStateInfo>
      {{ t('accountDescription') }}
    </CardStateInfo>
  </div>
</template>

<script lang="ts">
import { BREADCRUMB as BREADCRUMB_HOME } from '../index.vue'
import type { BreadcrumbItemPropsLocalized } from '~/types/breadcrumbs'

export const BREADCRUMB: BreadcrumbItemPropsLocalized = {
  icon: 'heroicons:user-group',
  label: {
    de: 'Konten',
    en: 'accounts',
  },
  to: '/accounts',
}
</script>

<script setup lang="ts">
const { t, locale } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps(
    [
      BREADCRUMB_HOME,
      {
        current: true,
        ...BREADCRUMB,
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
