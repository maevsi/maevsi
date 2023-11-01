<template>
  <div>
    <SBreadcrumb :items="breadcrumbItems" :ui="BREADCRUMBS_UI" />
    <i18n-t keypath="title" tag="h1">
      <template #name>
        <AppLink :to="localePath(`/accounts/${routeParamUsername}`)">
          {{ routeParamUsername }}
        </AppLink>
      </template>
    </i18n-t>
    <EventList :username="routeParamUsername" />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbEvents } from '../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'

export const usePageBreadcrumb = () => {
  const route = useRoute()

  return {
    label: route.params.username as string,
    to: `/events/${route.params.username as string}`,
  }
}
</script>

<script setup lang="ts">
definePageMeta({
  async validate(route) {
    return await validateAccountExistence({ route })
  },
})

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps(
    [
      usePageBreadcrumbHome(),
      usePageBreadcrumbEvents(),
      {
        current: true,
        ...usePageBreadcrumb(),
      },
    ],
    locale,
  ),
)
const routeParamUsername = route.params.username as string
const title = t('title', { name: route.params.username })

// initialization
useHeadDefault({
  title,
  extension: {
    ogType: 'profile',
    profileUsername: route.params.username as string,
  },
})
</script>

<i18n lang="yaml">
de:
  title: Veranstaltungen von {name}
en:
  title: Events by {name}
</i18n>
