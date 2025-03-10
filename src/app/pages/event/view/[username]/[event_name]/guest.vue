<template>
  <Loader :api="api">
    <div
      v-if="event && route.params.username === store.signedInUsername"
      class="flex flex-col gap-4"
    >
      <LayoutPageTitle :title="t('title')" />
      <GuestList :event="event" />
    </div>
    <Error v-else :status-code="403" />
  </Loader>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto-routes'

import { useAccountByUsernameQuery } from '~~/gql/documents/queries/account/accountByUsername'
import { useEventByCreatedByAndSlugQuery } from '~~/gql/documents/queries/event/eventByCreatedByAndSlug'
import { getAccountItem } from '~~/gql/documents/fragments/accountItem'
import { getEventItem } from '~~/gql/documents/fragments/eventItem'

const ROUTE_NAME: keyof RouteNamedMap =
  'event-view-username-event_name-guest___en'

definePageMeta({
  alias: '/event/view/:username/:event_name/invitation',
  async validate(route) {
    return await validateEventExistence(
      route as RouteLocationNormalized<typeof ROUTE_NAME>,
    )
  },
})

const route = useRoute(ROUTE_NAME)
const { t } = useI18n()
const store = useStore()

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
  useEventByCreatedByAndSlugQuery({
    createdBy: accountId,
    slug: route.params.event_name,
  }),
)
const event = computed(() =>
  getEventItem(eventQuery.data.value?.eventByCreatedByAndSlug),
)
const api = getApiData([accountByUsernameQuery, eventQuery])

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
  title: Gäste
en:
  title: Guests
</i18n>
