<template>
  <Loader
    :api="api"
    :error-pg-ids="{
      postgres28P01: t('postgres28P01'),
      postgresP0002: t('postgresP0002'),
    }"
  >
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
        {{ t('settings') }}
      </LayoutBreadcrumbs>
      <section>
        <h1>{{ t('title') }}</h1>
        <FormEvent :event="event" />
      </section>
      <section>
        <h2>{{ t('titleDelete') }}</h2>
        <FormDelete
          id="deleteEvent"
          :item-name="t('event')"
          :mutation="mutation"
          :variables="{
            id: event.id,
          }"
          @success="navigateTo(localePath(`/dashboard`))"
        />
      </section>
    </div>
    <Error v-else />
  </Loader>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'
import { getEventItem } from '~/gql/documents/fragments/eventItem'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { useEventDeleteMutation } from '~/gql/documents/mutations/event/eventDelete'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import { useEventByAuthorAccountIdAndSlugQuery } from '~/gql/documents/queries/event/eventByAuthorAccountIdAndSlug'

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

const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()

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
const eventDeleteMutation = useEventDeleteMutation()
const api = getApiData([
  accountByUsernameQuery,
  eventQuery,
  eventDeleteMutation,
])

// data
const mutation = eventDeleteMutation
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
  event: Veranstaltung
  events: Veranstaltungen
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
