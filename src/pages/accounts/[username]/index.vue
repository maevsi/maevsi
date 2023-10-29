<template>
  <Loader :api="api" indicator="ping">
    <div class="flex flex-col gap-4">
      <SBreadcrumb :items="breadcrumbItems" :ui="BREADCRUMBS_UI" />
      <ButtonList
        v-if="store.signedInUsername === routeParamUsername"
        class="justify-end"
      >
        <ButtonColored :aria-label="t('settings')" to="settings" is-to-relative>
          {{ t('settings') }}
          <template #prefix>
            <IconPencil />
          </template>
        </ButtonColored>
        <ButtonColored :aria-label="t('signOut')" @click="signOut">
          {{ t('signOut') }}
          <template #prefix>
            <IconSignOut />
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
          :to="localePath(`/events/${routeParamUsername}`)"
        >
          {{ t('eventsTheir', { name: routeParamUsername }) }}
          <template #prefix>
            <IconCalendar />
          </template>
        </ButtonColored>
      </ButtonList>
    </div>
  </Loader>
</template>

<script lang="ts">
import { BREADCRUMB as BREADCRUMB_ACCOUNTS } from '../index.vue'
import { BREADCRUMB as BREADCRUMB_HOME } from '../../index.vue'
import { useMaevsiStore } from '~/store'
import type { BreadcrumbItemPropsLocalized } from '~/types/types'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'

export const BREADCRUMB: BreadcrumbItemPropsLocalized = () => {
  const route = useRoute()

  return {
    icon: 'heroicons:user',
    label: route.params.username as string,
    to: `/accounts/${route.params.username as string}`,
  }
}
</script>

<script setup lang="ts">
definePageMeta({
  async validate(route) {
    return await validateAccountExistence({ route })
  },
})

const { signOut } = useSignOut()
const { t, locale } = useI18n()
const store = useMaevsiStore()
const route = useRoute()
const localePath = useLocalePath()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// api data
const accountByUsernameQuery = await useAccountByUsernameQuery({
  username: route.params.username as string,
})
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername,
)
const api = getApiData([accountByUsernameQuery])

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps(
    [
      BREADCRUMB_HOME,
      BREADCRUMB_ACCOUNTS,
      {
        current: true,
        ...BREADCRUMB(),
      },
    ],
    locale,
  ),
)
const routeParamUsername = route.params.username as string
const title = route.params.username as string

// initialization
useHeadDefault({
  title,
  extension: {
    ogType: 'profile',
    profileUsername: route.params.username as string,
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
