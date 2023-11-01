<template>
  <Loader :api="api">
    <div v-if="event" class="flex flex-col gap-4">
      <SBreadcrumb :items="breadcrumbItems" :ui="BREADCRUMBS_UI" />
      <h1>
        {{ t('title') }}
      </h1>
      <InvitationList :event="event" />
    </div>
    <Error v-else />
  </Loader>
</template>

<script lang="ts">
import { pageBreadcrumb as usePageBreadcrumbEventsUserId } from '../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbEventsUser } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbEvents } from '../../../index.vue'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import { useEventByAuthorAccountIdAndSlugQuery } from '~/gql/documents/queries/event/eventByAuthorAccountIdAndSlug'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { getEventItem } from '~/gql/documents/fragments/eventItem'
import { useMaevsiStore } from '~/store'

export const usePageBreadcrumb = () => {
  const route = useRoute()

  return {
    label: {
      de: 'Einladungen',
      en: 'Invitations',
    },
    to: `/events/${route.params.username as string}/${
      route.params.event_name as string
    }/invitations`,
  }
}
</script>

<script setup lang="ts">
definePageMeta({
  async validate(route) {
    const store = useMaevsiStore()

    await validateEventExistence(route)

    // TODO: extract to permission service
    if (route.params.username !== store.signedInUsername) {
      return abortNavigation({ statusCode: 403 })
    }

    return true
  },
})

const { $urql } = useNuxtApp()
const route = useRoute()
const { t, locale } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// api data
const accountByUsernameQuery = await useAccountByUsernameQuery({
  username: route.params.username as string,
})
const accountId = computed(
  () =>
    getAccountItem(accountByUsernameQuery.data.value?.accountByUsername)?.id,
)
const eventQuery = await useEventByAuthorAccountIdAndSlugQuery({
  authorAccountId: accountId,
  slug: route.params.event_name as string,
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
      await usePageBreadcrumbEventsUserId({ $urql, route }),
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
  if (!event.value) return t('title')

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
