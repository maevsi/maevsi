<template>
  <Loader :api="api">
    <div
      v-if="event && route.params.username === store.signedInUsername"
      class="flex flex-col gap-4"
    >
      <LayoutBreadcrumbs :items="breadcrumbItems" />
      <LayoutPageTitle :title="t('title')" />
      <InvitationList :event="event" />
    </div>
    <Error v-else :status-code="403" />
  </Loader>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbEvents } from '../../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbEventsUser } from '../index.vue'
import { pageBreadcrumb as usePageBreadcrumbEventsUserId } from './index.vue'

import type { TypedRouteFromName, RoutesNamesList } from '@typed-router'

import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import { useEventByAuthorAccountIdAndSlugQuery } from '~/gql/documents/queries/event/eventByAuthorAccountIdAndSlug'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { getEventItem } from '~/gql/documents/fragments/eventItem'
import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

const ROUTE_NAME: RoutesNamesList =
  'event-view-username-event_name-invitation___en'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Einladungen',
      en: 'Invitations',
    },
    to: `/event/view/${route.params.username}/${route.params.event_name}/invitation`,
  } as BreadcrumbLinkLocalized
}
</script>

<script setup lang="ts">
definePageMeta({
  async validate(route) {
    return await validateEventExistence(
      route as TypedRouteFromName<typeof ROUTE_NAME>,
    )
  },
})

const { $urql } = useNuxtApp()
const route = useRoute(ROUTE_NAME)
const { t } = useI18n()
const store = useMaevsiStore()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// api data
const accountByUsernameQuery = await zalgo(
  useAccountByUsernameQuery({
    username: route.params.username,
  }),
)
const accountId = computed(
  () =>
    getAccountItem(accountByUsernameQuery.data.value?.accountByUsername)?.id,
)
const eventQuery = await zalgo(
  useEventByAuthorAccountIdAndSlugQuery({
    authorAccountId: accountId,
    slug: route.params.event_name,
  }),
)
const event = computed(() =>
  getEventItem(eventQuery.data.value?.eventByAuthorAccountIdAndSlug),
)
const api = getApiData([accountByUsernameQuery, eventQuery])

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbEvents(),
  usePageBreadcrumbEventsUser(),
  await usePageBreadcrumbEventsUserId({ $urql, route }),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])

// computations
const title = computed(() => {
  if (api.value.isFetching) return t('globalLoading')

  if (!event.value || route.params.username !== store.signedInUsername)
    return '403'

  return `${t('title')} · ${event.value.name}`
})

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  title: Einladungen
en:
  title: Invitations
</i18n>
