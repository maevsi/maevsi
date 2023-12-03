<template>
  <Loader :api="api" indicator="ping">
    <div class="flex flex-col gap-4">
      <LayoutBreadcrumbs :items="breadcrumbItems" />
      <ButtonList
        v-if="store.signedInUsername === routeParamUsername"
        class="justify-end"
      >
        <ButtonColored
          :aria-label="t('settings')"
          :to="localePath(`/account/edit/${route.params.username}`)"
        >
          {{ t('settings') }}
          <template #prefix>
            <IHeroiconsPencil />
          </template>
        </ButtonColored>
        <ButtonColored :aria-label="t('signOut')" @click="signOut">
          {{ t('signOut') }}
          <template #prefix>
            <IHeroiconsOutlineLogout />
          </template>
        </ButtonColored>
      </ButtonList>
      <div
        class="flex min-w-0 flex-col items-center justify-center sm:flex-row"
      >
        <div class="sm:mr-4">
          <AccountProfilePicture
            :account-id="account?.id"
            classes="h-24 rounded w-24"
            height="96"
            width="96"
          />
        </div>
        <h1>
          {{ routeParamUsername }}
        </h1>
      </div>
      <ButtonList class="justify-center">
        <ButtonColored
          :aria-label="t('eventsTheir', { name: routeParamUsername })"
          :is-primary="false"
          :to="localePath(`/event/view/${routeParamUsername}`)"
        >
          {{ t('eventsTheir', { name: routeParamUsername }) }}
          <template #prefix>
            <IHeroiconsCalendar />
          </template>
        </ButtonColored>
      </ButtonList>
    </div>
  </Loader>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbAccounts } from '../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'

import {
  type TypedRouteFromName,
  type RoutesNamesList,
  helpers,
} from '@typed-router'

import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'

const ROUTE_NAME = 'account-view-username'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)
  const localePath = useLocalePath()

  return {
    label: route.params.username,
    to: helpers.route(localePath(`/account/view/${route.params.username}`)),
  }
}
</script>

<script setup lang="ts" generic="T extends RoutesNamesList, P extends string">
definePageMeta({
  async validate(route) {
    return await validateAccountExistence({
      route: route as TypedRouteFromName<typeof ROUTE_NAME>,
    })
  },
})

const { signOut } = useSignOut()
const { t, locale } = useI18n()
const store = useMaevsiStore()
const route = useRoute(ROUTE_NAME)
const localePath = useLocalePath()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// api data
const accountByUsernameQuery = await useAccountByUsernameQuery({
  username: route.params.username,
})
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername,
)
const api = getApiData([accountByUsernameQuery])

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps(
    [
      usePageBreadcrumbHome(),
      usePageBreadcrumbAccounts(),
      {
        current: true,
        ...usePageBreadcrumb(),
      },
    ],
    locale,
  ),
)
const routeParamUsername = route.params.username
const title = route.params.username

// initialization
useHeadDefault({
  title,
  extension: {
    ogType: 'profile',
    profileUsername: route.params.username,
  },
})
</script>

<i18n lang="yaml">
de:
  eventsTheir: Veranstaltungen von {name}
  settings: Bearbeiten
  signOut: Abmelden
en:
  eventsTheir: Events by {name}
  settings: Edit
  signOut: Sign out
</i18n>
