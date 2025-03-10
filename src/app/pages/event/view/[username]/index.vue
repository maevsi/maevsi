<template>
  <Loader :api="api">
    <LayoutPageTitle title="-">
      <i18n-t keypath="title" tag="h1">
        <template #name>
          <AppLink
            :to="
              localePath({
                name: 'account-view-username',
                params: { username: routeParamUsername },
              })
            "
          >
            {{ routeParamUsername }}
          </AppLink>
        </template>
      </i18n-t>
    </LayoutPageTitle>
    <EventList
      :events="events"
      :has-next-page="api.data.allEvents?.pageInfo.hasNextPage"
      @load-more="allEventsQueryAfter = api.data.allEvents?.pageInfo.endCursor"
    />
  </Loader>
</template>

<script setup lang="ts">
import type { RouteNamedMap } from 'vue-router/auto-routes'

import { useAccountByUsernameQuery } from '~~/gql/documents/queries/account/accountByUsername'
import { getAccountItem } from '~~/gql/documents/fragments/accountItem'
import { getEventItem } from '~~/gql/documents/fragments/eventItem'
import { useAllEventsQuery } from '~~/gql/documents/queries/event/eventsAll'

const ROUTE_NAME: keyof RouteNamedMap = 'event-view-username-event_name___en'

const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
const localePath = useLocalePath()

// api data
const accountByUsernameQuery = await zalgo(
  useAccountByUsernameQuery({
    username: route.params.username,
  }),
)
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername,
)

if (!account) {
  throw createError({
    statusCode: 404,
  })
}

const allEventsQueryAfter = ref<string>()
const allEventsQuery = await zalgo(
  useAllEventsQuery({
    after: allEventsQueryAfter,
    createdBy: account.id,
    first: ITEMS_PER_PAGE,
  }),
)
const events = computed(
  () =>
    allEventsQuery.data.value?.allEvents?.nodes
      ?.map(getEventItem)
      .filter(isNeitherNullNorUndefined) || [],
)
const api = getApiData([allEventsQuery])

// data
const routeParamUsername = route.params.username
const title = t('title', { name: route.params.username })

// initialization
useHeadDefault({
  ogType: 'profile',
  profileUsername: route.params.username,
  title,
})
</script>

<i18n lang="yaml">
de:
  title: Veranstaltungen von {name}
en:
  title: Events by {name}
</i18n>
