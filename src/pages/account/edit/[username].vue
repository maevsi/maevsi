<template>
  <Loader :api="api" indicator="ping">
    <div class="flex flex-col gap-4">
      <LayoutBreadcrumbs :items="breadcrumbItems" />
      <LayoutPageTitle v-if="store.jwtDecoded" :title="routeParamUsername" />
      <section class="flex justify-center">
        <Button
          :aria-label="t('profilePictureChange')"
          @click="showModalUploadSelection"
        >
          <div class="flex items-center gap-4">
            <AccountProfilePicture
              :account-id="account?.id"
              classes="h-24 rounded w-24"
              height="96"
              width="96"
            />
            <IHeroiconsPencil />
          </div>
        </Button>
        <ModalUploadSelection @select="onUploadSelect" />
      </section>
      <section>
        <h2>{{ t('titleInterests') }}</h2>
        <FormInterest />
      </section>
      <section class="flex flex-col gap-4">
        <h2>{{ t('account') }}</h2>
        <div class="flex flex-col gap-2">
          <CardButton
            :title="t('passwordChange')"
            :to="localePath(`/account/password/edit/${route.params.username}`)"
          >
            <IHeroiconsKey />
          </CardButton>
          <CardButton
            :title="t('accountDelete')"
            :to="localePath(`/account/delete/${route.params.username}`)"
          >
            <IHeroiconsTrash />
          </CardButton>
        </div>
      </section>
    </div>
  </Loader>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbAccountsId } from '../view/[username].vue'
import { usePageBreadcrumb as usePageBreadcrumbAccounts } from '../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'

import type { TypedRouteFromName, RoutesNamesList } from '@typed-router'

import { useProfilePictureSetMutation } from '~/gql/documents/mutations/profilePicture/profilePictureSet'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

const ROUTE_NAME: RoutesNamesList = 'account-edit-username'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Bearbeiten',
      en: 'Edit',
    },
    to: `/account/edit/${route.params.username}`,
  } as BreadcrumbLinkLocalized
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
const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// api data
const accountByUsernameQuery = await zalgo(
  useAccountByUsernameQuery({
    username: route.params.username,
  }),
)
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername,
)
const profilePictureSetMutation = useProfilePictureSetMutation()
const api = getApiData([accountByUsernameQuery, profilePictureSetMutation])

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbHome(),
  usePageBreadcrumbAccounts(),
  usePageBreadcrumbAccountsId(),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])
const routeParamUsername = route.params.username
const title = t('title')

// methods
const onUploadSelect = async (uploadId?: string | null | undefined) =>
  await profilePictureSetMutation.executeMutation({
    uploadId,
  })
const showModalUploadSelection = () => {
  store.modals.push({ id: 'ModalUploadSelection' })
}

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  account: Konto
  accountDelete: Konto löschen
  profilePictureChange: Profilbild ändern
  passwordChange: Password ändern
  title: Bearbeiten
  titleInterests: Interessen
en:
  account: Account
  accountDelete: Delete account
  profilePictureChange: Change profile picture
  passwordChange: Change password
  title: Edit
  titleInterests: Interests
</i18n>
