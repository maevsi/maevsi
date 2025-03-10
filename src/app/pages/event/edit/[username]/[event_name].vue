<template>
  <Loader
    :api="api"
    :error-pg-ids="{
      postgres28P01: t('postgres28P01'),
      postgresP0002: t('postgresP0002'),
    }"
  >
    <div
      v-if="event && route.params.username === store.signedInUsername"
      class="flex flex-col gap-4"
    >
      <section>
        <LayoutPageTitle :title="t('title')" />
        <FormEvent :event="event" />
      </section>
      <section>
        <h2>{{ t('titleDelete') }}</h2>
        <FormDelete
          id="deleteEvent"
          :item-name-deletion="t('formDeleteItemNameDeletion')"
          :item-name-success="t('formDeleteItemNameSuccess')"
          :mutation="mutation"
          :variables="{
            id: event.id,
          }"
          @success="navigateTo(localePath(`dashboard`))"
        />
      </section>
    </div>
    <Error v-else :status-code="403" />
  </Loader>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto-routes'

import { getEventItem } from '~~/gql/documents/fragments/eventItem'
import { getAccountItem } from '~~/gql/documents/fragments/accountItem'
import { useEventDeleteMutation } from '~~/gql/documents/mutations/event/eventDelete'
import { useAccountByUsernameQuery } from '~~/gql/documents/queries/account/accountByUsername'
import { useEventByCreatedByAndSlugQuery } from '~~/gql/documents/queries/event/eventByCreatedByAndSlug'

const ROUTE_NAME: keyof RouteNamedMap = 'event-edit-username-event_name___en'

definePageMeta({
  async validate(route) {
    return await validateEventExistence(
      route as RouteLocationNormalized<typeof ROUTE_NAME>,
    )
  },
})

const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
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
const eventDeleteMutation = useEventDeleteMutation()
const api = getApiData([
  accountByUsernameQuery,
  eventQuery,
  eventDeleteMutation,
])

// data
const mutation = eventDeleteMutation

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
  formDeleteItemNameDeletion: Veranstaltung
  formDeleteItemNameSuccess: Veranstaltung
  postgres28P01: Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
  postgresP0002: Die Veranstaltung wurde nicht gefunden!
  title: Veranstaltung bearbeiten
  titleDelete: Veranstaltung löschen
en:
  formDeleteItemNameDeletion: event
  formDeleteItemNameSuccess: Event
  postgres28P01: Password incorrect! Check for spelling mistakes.
  postgresP0002: Event could not be found!
  title: Edit event
  titleDelete: Delete event
</i18n>
