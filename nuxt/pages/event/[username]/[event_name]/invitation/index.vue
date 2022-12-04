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
              `/event/${route.params.username}/${route.params.event_name}`
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
import consola from 'consola'
import { useEventByAuthorUsernameAndSlugQuery } from '~/gql/generated'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { useMaevsiStore } from '~/store'

definePageMeta({
  async validate(route) {
    const { $urql } = useNuxtApp()
    const store = useMaevsiStore()

    const eventIsExisting = await $urql.value
      .query(EVENT_IS_EXISTING_QUERY, {
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

// queries
const eventQuery = await useEventByAuthorUsernameAndSlugQuery({
  variables: {
    authorUsername: route.params.username as string,
    slug: route.params.event_name as string,
  },
})

// api data
const api = computed(() =>
  reactive({
    data: {
      ...eventQuery.data.value,
    },
    ...getApiMeta([eventQuery]),
  })
)
const event = computed(
  () => eventQuery.data.value?.eventByAuthorUsernameAndSlug
)

// data
const routeParamEventName = route.params.event_name as string
const routeParamUsername = route.params.username as string

// computations
const title = computed(() => {
  if (!event.value) return t('title')

  return `${t('title')} · ${event.value.name}`
})

// lifecycle
watch(eventQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})

// initialization
useHeadDefault(title)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
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
