<template>
  <Loader :api="api">
    <div v-if="event" class="flex flex-col gap-4">
      <LayoutBreadcrumbs
        :prefixes="[
          { name: t('events'), to: localePath('/events') },
          {
            name: routeParamUsername,
            to: localePath(`/events/${route.params.username}`),
          },
          {
            name: routeParamEventName,
            to: localePath(
              `/events/${route.params.username}/${route.params.event_name}`,
            ),
          },
        ]"
      >
        {{ t('invitations') }}
      </LayoutBreadcrumbs>
      <h1>
        {{ t('title') }}
      </h1>
      <InvitationList :event="event" />
    </div>
    <Error v-else />
  </Loader>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import { useEventByAuthorAccountIdAndSlugQuery } from '~/gql/documents/queries/event/eventByAuthorAccountIdAndSlug'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { getEventItem } from '~/gql/documents/fragments/eventItem'

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

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

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
const routeParamEventName = route.params.event_name as string
const routeParamUsername = route.params.username as string

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
  events: Veranstaltungen
  invitations: Einladungen
  title: Einladungen
en:
  events: events
  invitations: invitations
  title: Invitations
</i18n>
