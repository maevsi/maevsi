<template>
  <Loader :api="api">
    <div
      v-if="event && route.params.username === store.signedInUsername"
      class="flex flex-col gap-4"
    >
      <LayoutBreadcrumbs :items="breadcrumbItems" />
      <h1>
        {{ t('title') }}
      </h1>
      <InvitationList :event="event" />
    </div>
    <Error v-else :status-code="403" />
  </Loader>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbEvents } from '../../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbEventsUser } from '../index.vue'
import { pageBreadcrumb as usePageBreadcrumbEventsUserId } from './index.vue'

import { type TypedRouteFromName, helpers } from '@typed-router'

import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import { useEventByAuthorAccountIdAndSlugQuery } from '~/gql/documents/queries/event/eventByAuthorAccountIdAndSlug'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { getEventItem } from '~/gql/documents/fragments/eventItem'

const ROUTE_NAME = 'event-view-username-event_name-invitation___en'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)
  const localePath = useLocalePath()

  return {
    label: {
      de: 'Einladungen',
      en: 'Invitations',
    },
    to: helpers.route(
      localePath(
        `/event/view/${route.params.username}/${route.params.event_name}/invitation`,
      ),
    ),
  }
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
const { t, locale } = useI18n()
const store = useMaevsiStore()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const localePath = useLocalePath()

// api data
const accountByUsernameQuery = await useAccountByUsernameQuery({
  username: route.params.username,
})
const accountId = computed(
  () =>
    getAccountItem(accountByUsernameQuery.data.value?.accountByUsername)?.id,
)
const eventQuery = await useEventByAuthorAccountIdAndSlugQuery({
  authorAccountId: accountId,
  slug: route.params.event_name,
})
const event = computed(() =>
  getEventItem(eventQuery.data.value?.eventByAuthorAccountIdAndSlug),
)
const api = getApiData([accountByUsernameQuery, eventQuery])

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps(
    [
      usePageBreadcrumbEvents(),
      usePageBreadcrumbEventsUser(),
      await usePageBreadcrumbEventsUserId({ $urql, localePath, route }),
      {
        current: true,
        ...usePageBreadcrumb(),
      },
    ],
    locale,
  ),
)

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
