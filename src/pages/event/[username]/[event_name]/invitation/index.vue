<template>
  <Loader :api="api">
    <div v-if="event" class="flex flex-col gap-4">
      <LayoutBreadcrumbs
        :prefixes="[
          { name: t('events'), to: localePath('/event') },
          {
            name: routeParamUsername,
            to: localePath(`/event/${route.params.username}`),
          },
          {
            name: routeParamEventName,
            to: localePath(
              `/event/${route.params.username}/${route.params.event_name}`,
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
import { useNuxtApp } from '#app/nuxt'

import { useMaevsiStore } from '~/store'
import { useEventByAuthorUsernameAndSlugQuery } from '~/gql/documents/queries/event/eventByAuthorUsernameAndSlug'
import { getEventItem } from '~/gql/documents/fragments/eventItem'
import { eventIsExistingQuery } from '~/gql/documents/queries/event/eventIsExisting'

definePageMeta({
  async validate(route) {
    const { $urql } = useNuxtApp()
    const store = useMaevsiStore()

    const eventIsExisting = await $urql.value
      .query(eventIsExistingQuery, {
        slug: route.params.event_name as string,
        authorUsername: route.params.username as string,
      })
      .toPromise()

    if (eventIsExisting.error) {
      throw createError(eventIsExisting.error)
    }

    if (!eventIsExisting.data?.eventIsExisting) {
      return abortNavigation({ statusCode: 404 })
    }

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
const eventQuery = await useEventByAuthorUsernameAndSlugQuery({
  authorUsername: route.params.username as string,
  slug: route.params.event_name as string,
})
const api = getApiData([eventQuery])
const event = computed(() =>
  getEventItem(eventQuery.data.value?.eventByAuthorUsernameAndSlug),
)

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
