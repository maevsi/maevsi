<template>
  <Loader :api="api" indicator="ping">
    <div class="flex flex-col gap-4">
      <LayoutBreadcrumbs :items="breadcrumbItems" />
      <LayoutPageTitle
        v-if="store.jwtDecoded"
        :title="routeParamUsername"
        :to="`/account/edit/${route.params.username}`"
      />
      <section>
        <h2>{{ t('titlePasswordChange') }}</h2>
        <FormAccountPasswordChange />
      </section>
    </div>
  </Loader>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbAccountsId } from '../../view/[username].vue'
import { usePageBreadcrumb as usePageBreadcrumbAccounts } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbAccountsIdEdit } from '../../edit/[username].vue'

import { type TypedRouteFromName, type RoutesNamesList } from '@typed-router'

import { useProfilePictureSetMutation } from '~/gql/documents/mutations/profilePicture/profilePictureSet'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

const ROUTE_NAME: RoutesNamesList = 'account-edit-username'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Passwort',
      en: 'Password',
    },
    to: `/account/password/edit/${route.params.username}`,
  } as BreadcrumbItemPropsLocalizedObject
}
</script>

<script setup lang="ts">
definePageMeta({
  async validate(route) {
    return await validateAccountExistence({
      isAuthorizationRequired: true,
      route: route as TypedRouteFromName<typeof ROUTE_NAME>,
    })
  },
})

const store = useMaevsiStore()
const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// api data
const accountByUsernameQuery = await zalgo(
  useAccountByUsernameQuery({
    username: route.params.username,
  }),
)
const profilePictureSetMutation = useProfilePictureSetMutation()
const api = getApiData([accountByUsernameQuery, profilePictureSetMutation])

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbAccounts(),
  usePageBreadcrumbAccountsId(),
  usePageBreadcrumbAccountsIdEdit(),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])
const routeParamUsername = route.params.username
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  title: Bearbeiten
  titlePasswordChange: Password des Kontos ändern
en:
  title: Edit
  titlePasswordChange: Change account password
</i18n>
