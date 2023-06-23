<template>
  <div>
    <LayoutBreadcrumbs
      :prefixes="[{ name: t('events'), to: localePath('/event') }]"
    >
      {{ routeParamUsername }}
    </LayoutBreadcrumbs>
    <i18n-t keypath="title" tag="h1">
      <template #name>
        <AppLink :to="localePath(`/account/${routeParamUsername}`)">
          {{ routeParamUsername }}
        </AppLink>
      </template>
    </i18n-t>
    <EventList :username="routeParamUsername" />
  </div>
</template>

<script setup lang="ts">
import { accountIsExistingQuery } from '~/gql/documents/queries/account/accountIsExisting'

definePageMeta({
  async validate(route) {
    const { $urql } = useNuxtApp()

    const accountIsExisting = await $urql.value
      .query(accountIsExistingQuery, {
        username: route.params.username as string,
      })
      .toPromise()

    if (accountIsExisting.error) {
      throw createError(accountIsExisting.error)
    }

    if (!accountIsExisting.data?.accountIsExisting) {
      return abortNavigation({ statusCode: 404 })
    }

    return true
  },
})

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

// data
const routeParamUsername = route.params.username as string
const title = t('title', { name: route.params.username })

// initialization
useHeadDefault(title, {
  meta: [
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'profile',
    },
    {
      hid: 'profile:username',
      property: 'profile:username',
      content: route.params.username as string,
    },
  ],
})
</script>

<i18n lang="yaml">
de:
  events: Veranstaltungen
  title: Veranstaltungen von {name}
en:
  events: events
  title: Events by {name}
</i18n>
