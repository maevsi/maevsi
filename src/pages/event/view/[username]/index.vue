<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <LayoutPageTitle title="-">
      <i18n-t keypath="title" tag="h1">
        <template #name>
          <AppLink :to="localePath(`/account/view/${routeParamUsername}`)">
            {{ routeParamUsername }}
          </AppLink>
        </template>
      </i18n-t>
    </LayoutPageTitle>
    <EventList :username="routeParamUsername" />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbEvents } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../../index.vue'

import type { TypedRouteFromName, RoutesNamesList } from '@typed-router'
import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

const ROUTE_NAME: RoutesNamesList = 'event-view-username-event_name___en'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: route.params.username,
    to: `/event/view/${route.params.username}`,
  } as BreadcrumbLinkLocalized
}
</script>

<script setup lang="ts">
definePageMeta({
  async validate(route) {
    return await validateAccountExistence({
      route: route as TypedRouteFromName<typeof ROUTE_NAME>,
    })
  },
})

const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
const localePath = useLocalePath()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbHome(),
  usePageBreadcrumbEvents(),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])
const routeParamUsername = route.params.username
const title = t('title', { name: route.params.username })

// initialization
useHeadDefault({
  title,
  extension: {
    ogType: 'profile',
    profileUsername: route.params.username,
  },
})
</script>

<i18n lang="yaml">
de:
  title: Veranstaltungen von {name}
en:
  title: Events by {name}
</i18n>
