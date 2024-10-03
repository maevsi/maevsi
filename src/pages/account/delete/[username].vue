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
        <h2>{{ t('accountDelete') }}</h2>
        <FormDelete
          id="deleteAccount"
          :error-pg-ids="{
            postgres23503: t('postgres23503'),
            postgres28P01: t('postgres28P01'),
          }"
          :item-name-deletion="t('formDeleteItemNameDeletion')"
          :item-name-success="t('formDeleteItemNameSuccess')"
          :mutation="mutation"
          @success="signOut"
        />
      </section>
    </div>
  </Loader>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbAccountsId } from '../view/[username].vue'
import { usePageBreadcrumb as usePageBreadcrumbAccounts } from '../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbAccountsIdEdit } from '../edit/[username].vue'

import { type TypedRouteFromName, type RoutesNamesList } from '@typed-router'

import { useAccountDeleteMutation } from '~/gql/documents/mutations/account/accountDelete'
import { useProfilePictureSetMutation } from '~/gql/documents/mutations/profilePicture/profilePictureSet'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

const ROUTE_NAME: RoutesNamesList = 'account-edit-username'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Löschen',
      en: 'Delete',
    },
    to: `/account/delete/${route.params.username}`,
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
const { signOut } = useSignOut()
const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
const accountDeleteMutation = useAccountDeleteMutation()
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
const mutation = accountDeleteMutation
const routeParamUsername = route.params.username
const title = t('settings')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  accountDelete: Konto löschen
  formDeleteItemNameDeletion: Konto
  formDeleteItemNameSuccess: Konto
  postgres23503: Dir gehören noch Daten! Lösche erst all deine Veranstaltungen, Kontakte und Bilder.
  postgres28P01: Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
  settings: Bearbeiten
en:
  accountDelete: Delete account
  formDeleteItemNameDeletion: account
  formDeleteItemNameSuccess: Account
  postgres23503: There's still some data connected to your account! Delete all your events, contacts and images first.
  postgres28P01: Password incorrect! Check for spelling mistakes.
  settings: edit
</i18n>
