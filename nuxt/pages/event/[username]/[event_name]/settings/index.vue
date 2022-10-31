<template>
  <Loader :api="api">
    <div v-if="event" class="flex flex-col gap-4">
      <Breadcrumbs
        :prefixes="[
          { name: t('events'), to: '../../..', isToRelative: true },
          { name: routeParamUsername, to: '../..', isToRelative: true },
          { name: routeParamEventName, to: '..', isToRelative: true },
        ]"
      >
        {{ t('settings') }}
      </Breadcrumbs>
      <section>
        <h1>{{ t('title') }}</h1>
        <FormEvent :event="event" />
      </section>
      <section>
        <h2>{{ t('titleDelete') }}</h2>
        <FormDelete
          id="deleteEvent"
          :errors="api.errors"
          :item-name="t('event')"
          :mutation="mutation"
          :variables="{
            authorUsername: routeParamUsername,
            slug: routeParamEventName,
          }"
          @error="onDeleteError"
          @success="onDeleteSuccess"
        />
      </section>
    </div>
    <Error v-else />
  </Loader>
</template>

<script setup lang="ts">
import { CombinedError } from '@urql/vue'
import consola from 'consola'

import { getApiMeta } from '~/plugins/util/util'
import {
  useEventByAuthorUsernameAndSlugQuery,
  useEventDeleteMutation,
} from '~/gql/generated'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { useMaevsiStore } from '~/store'

definePageMeta({
  async validate(route) {
    const store = useMaevsiStore()
    if (route.params.username !== store.signedInUsername) {
      throw createError({ statusCode: 403 })
    }
    const { $urql } = useNuxtApp()

    const eventIsExisting = await $urql.value
      .query(EVENT_IS_EXISTING_QUERY, {
        slug: route.params.event_name as string,
        authorUsername: route.params.username as string,
      })
      .toPromise()

    return !eventIsExisting.error && !!eventIsExisting.data?.eventIsExisting
  },
})

const localePath = useLocalePath()
const { t } = useI18n()
const store = useMaevsiStore()
const route = useRoute()
const { executeMutation: executeMutationEventDelete } = useEventDeleteMutation()

// queries
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
const mutation = executeMutationEventDelete
const routeParamEventName = route.params.event_name as string
const routeParamUsername = route.params.username as string

// methods
function onDeleteError(error: CombinedError) {
  api.value.errors.push(error)
}
function onDeleteSuccess() {
  navigateTo(localePath(`/dashboard`))
  // TODO: cache update (allEvents)
}

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
  events: Veranstaltung
  postgres28P01: Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
  postgresP0002: Die Veranstaltung wurde nicht gefunden!
  settings: bearbeiten
  title: Veranstaltung bearbeiten
  titleDelete: Veranstaltung löschen
en:
  event: event
  events: events
  postgres28P01: Password incorrect! Check for spelling mistakes.
  postgresP0002: Event could not be found!
  settings: edit
  title: Edit event
  titleDelete: Delete event
</i18n>
