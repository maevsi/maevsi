<template>
  <Loader :api="api" indicator="ping">
    <div class="flex flex-col gap-4">
      <LayoutBreadcrumbs :items="breadcrumbItems" />
      <LayoutPageTitle :title="routeParamUsername" />
      <div
        class="flex min-w-0 flex-col items-center justify-center sm:flex-row"
      >
        <div class="sm:mr-4">
          <AccountProfilePicture
            :account-id="account?.id"
            classes="h-48 rounded w-48"
            height="192"
            width="192"
          />
        </div>
      </div>
      <div class="flex justify-center">
        <div class="relative">
          <ButtonColored
            v-if="store.signedInUsername !== routeParamUsername"
            :aria-label="t('friendAdd')"
            disabled
          >
            {{ t('friendAdd') }}
          </ButtonColored>
          <UnderConstruction />
        </div>
      </div>
      <CardButton
        v-if="store.signedInUsername !== routeParamUsername"
        :title="t('eventsTheir', { name: routeParamUsername })"
        :to="localePath(`/event/view/${routeParamUsername}`)"
      >
        <IHeroiconsCalendar />
      </CardButton>
      <div class="flex flex-col gap-2">
        <span class="text-xl font-bold">
          {{ t('friends') }}
        </span>
        <!-- @vue-ignore -->
        <CardButton class="relative" is-disabled :to="`/friend/view/$username`">
          <div class="isolate flex -space-x-2 overflow-hidden p-1">
            <AccountProfilePicture
              account-id="d3d7f2d0-bbf5-46aa-84ba-82ccf3c6af6b"
              classes="rounded-full ring ring-background-brighten dark:ring-background-darken"
              height="64"
              width="64"
            />
            <AccountProfilePicture
              account-id="d3d7f2d0-bbf5-46aa-84ba-82ccf3c6af6b"
              classes="rounded-full ring ring-background-brighten dark:ring-background-darken"
              height="64"
              width="64"
            />
            <AccountProfilePicture
              account-id="d3d7f2d0-bbf5-46aa-84ba-82ccf3c6af6b"
              classes="rounded-full ring ring-background-brighten dark:ring-background-darken"
              height="64"
              width="64"
            />
          </div>
          <UnderConstruction />
        </CardButton>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-xl font-bold">
          {{ t('achievements') }}
        </span>
        <!-- @vue-ignore -->
        <CardButton class="relative" is-disabled :to="`/trophy/view/$username`">
          <div class="flex gap-2 text-center">
            <div class="flex flex-1 flex-col items-center gap-2 p-2">
              <IHeroiconsTrophy height="2em" width="2em" />
              <span class="text-gray-700 dark:text-gray-300">
                {{ t('achievementTopG') }}
              </span>
            </div>
            <div class="flex flex-1 flex-col items-center gap-2 p-2">
              <IHeroiconsStar height="2em" width="2em" />
              <span class="text-gray-700 dark:text-gray-300">
                {{ t('achievementStarChef') }}
              </span>
            </div>
            <div class="flex flex-1 flex-col items-center gap-2 p-2">
              <IHeroiconsArrowPath height="2em" width="2em" />
              <span class="text-gray-700 dark:text-gray-300">
                {{ t('achievementReturnee') }}
              </span>
            </div>
          </div>
          <UnderConstruction />
        </CardButton>
      </div>
    </div>
  </Loader>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbAccounts } from '../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'

import { type TypedRouteFromName, type RoutesNamesList } from '@typed-router'

import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

const ROUTE_NAME: RoutesNamesList = 'account-view-username'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: route.params.username,
    to: `/account/view/${route.params.username}`,
  } satisfies BreadcrumbLinkLocalized
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

const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
const localePath = useLocalePath()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const store = useMaevsiStore()

// api data
const accountByUsernameQuery = await useAccountByUsernameQuery({
  username: route.params.username,
})
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername,
)
const api = getApiData([accountByUsernameQuery])

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbHome(),
  usePageBreadcrumbAccounts(),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])
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
  achievements: Trophäen
  achievementReturnee: Wiederkehrer
  achievementStarChef: Sterne-Koch
  achievementTopG: Bester Mann
  eventsTheir: Veranstaltungen von {name}
  friendAdd: Freundschaftsanfrage senden
  friends: Freunde
en:
  achievements: Achievements
  achievementReturnee: Returnee
  achievementStarChef: Star chef
  achievementTopG: Top G
  eventsTheir: Events by {name}
  friends: Friends
  friendAdd: Send friend request
</i18n>
