<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <LayoutPageTitle title="-">
      <i18n-t keypath="title" tag="h1">
        <template #name>
          <AppLink
            :to="
              localePath(
                {
                  name: 'account-view-username',
                  params: { username: routeParamUsername },
                },
                //`/account/view/${routeParamUsername}`
              )
            "
          >
            {{ routeParamUsername }}
          </AppLink>
        </template>
      </i18n-t>
    </LayoutPageTitle>
    <EventList v-if="account" :account-id="account.id" />
    <Error v-else :status-code="500" />
  </div>
</template>

<script lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto-routes'

import { usePageBreadcrumb as usePageBreadcrumbEvents } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../../index.vue'

import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'
import { useAccountByUsernameQuery } from '~~/gql/documents/queries/account/accountByUsername'
import { getAccountItem } from '~~/gql/documents/fragments/accountItem'

const ROUTE_NAME: keyof RouteNamedMap = 'event-view-username-event_name___en'

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
      route: route as RouteLocationNormalized<typeof ROUTE_NAME>,
    })
  },
})

const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
const localePath = useLocalePath()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// api data
const accountByUsernameQuery = await zalgo(
  useAccountByUsernameQuery({
    username: route.params.username,
  }),
)
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername,
)

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
