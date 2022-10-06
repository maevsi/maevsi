<template>
  <Loader :api="api">
    <div v-if="event" class="flex flex-col gap-4">
      <Breadcrumbs
        :prefixes="[
          { name: t('events'), to: '../../..', append: true },
          { name: routeParamUsername, to: '../..', append: true },
          { name: routeParamEventName, to: '..', append: true },
        ]"
      >
        {{ t('invitations') }}
      </Breadcrumbs>
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
import { getApiMeta } from '~/plugins/util/util'
import {
  useEventByAuthorUsernameAndSlugQuery,
  useEventIsExistingQuery,
} from '~/gql/generated'
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const route = useRoute()
      const store = useMaevsiStore()

      if (route.params.username !== store.signedInUsername) {
        throw createError({ statusCode: 403 })
      }

      const eventIsExisting = useEventIsExistingQuery({
        variables: {
          slug: route.params.event_name as string,
          authorUsername: route.params.username as string,
        },
      }).executeQuery()

      if (
        eventIsExisting.error ||
        eventIsExisting.data.value?.eventIsExisting
      ) {
        return abortNavigation() // TODO: { statusCode: 403 }
      }
    },
  ],
})

// uses
const route = useRoute()
const { t } = useI18n()
const store = useMaevsiStore()
const eventQuery = useEventByAuthorUsernameAndSlugQuery({
  variables: {
    authorUsername: route.params.username as string,
    slug: route.params.event_name as string,
  },
})

// api data
const api = computed(() => {
  return {
    data: {
      ...eventQuery.data.value,
    },
    ...getApiMeta([eventQuery]),
  }
})
const event = computed(
  () => eventQuery.data.value?.eventByAuthorUsernameAndSlug
)

// data
const routeParamEventName = route.params.event_name as string
const routeParamUsername = route.params.username as string

// computations
const title = computed(() => {
  if (route.params.username === store.signedInUsername && event.value) {
    return `${t('title')} · ${event.value.name}`
  }
  return '403'
})

// lifecycle
watch(eventQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})

// initialization
useHeadDefault(title.value)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yml">
de:
  event: Veranstaltung
  events: Veranstaltungen
  invitations: Einladungen
  title: Einladungen
en:
  event: event
  events: events
  invitations: invitations
  title: Invitations
</i18n>
