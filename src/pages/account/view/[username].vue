<template>
  <Loader :api="api" indicator="ping">
    <div class="flex flex-col gap-4">
      <LayoutBreadcrumbs :items="breadcrumbItems" />
      <LayoutPageTitle :title="routeParamUsername" />
      <div
        class="flex min-w-0 flex-col items-center justify-center sm:flex-row"
      >
        <div class="sm:mr-4">
          <AccountProfilePicture
            :account-id="account?.id"
            classes="h-24 rounded w-24"
            height="96"
            width="96"
          />
        </div>
      </div>
      <CardButton
        :title="t('eventsTheir', { name: routeParamUsername })"
        :to="localePath(`/event/view/${routeParamUsername}`)"
      >
        <IHeroiconsCalendar />
      </CardButton>
    </div>
  </Loader>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbAccounts } from '../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'

import { type TypedRouteFromName, type RoutesNamesList } from '@typed-router'

import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

const ROUTE_NAME: RoutesNamesList = 'account-view-username'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: route.params.username,
    to: `/account/view/${route.params.username}`,
  } as BreadcrumbItemPropsLocalizedObject
}
</script>

<script setup lang="ts" generic="T extends RoutesNamesList, P extends string">
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

// api data
const accountByUsernameQuery = await useAccountByUsernameQuery({
  username: route.params.username,
})
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername,
)
const api = getApiData([accountByUsernameQuery])

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps([
    usePageBreadcrumbHome(),
    usePageBreadcrumbAccounts(),
    {
      current: true,
      ...usePageBreadcrumb(),
    },
  ]),
)
const routeParamUsername = route.params.username
const title = route.params.username

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
  eventsTheir: Veranstaltungen von {name}
en:
  eventsTheir: Events by {name}
</i18n>
