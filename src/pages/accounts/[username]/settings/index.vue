<template>
  <Loader :api="api" indicator="ping">
    <div class="flex flex-col gap-4">
      <SBreadcrumb :items="breadcrumbItems" :ui="BREADCRUMBS_UI" />
      <div
        class="flex min-w-0 flex-col items-center justify-center sm:flex-row"
      >
        <Button
          :aria-label="t('profilePictureChange')"
          class="sm:mr-4"
          @click="showModalUploadSelection"
        >
          <AccountProfilePicture
            :account-id="account?.id"
            classes="h-24 rounded w-24"
            height="96"
            width="96"
          />
        </Button>
        <h1>
          {{ routeParamUsername }}
        </h1>
        <ModalUploadSelection @select="onUploadSelect" />
      </div>
      <section>
        <h2>{{ t('titlePasswordChange') }}</h2>
        <FormAccountPasswordChange />
      </section>
      <section>
        <h2>{{ t('titleAccountDelete') }}</h2>
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
import { usePageBreadcrumb as usePageBreadcrumbAccountsId } from '../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbAccounts } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../../index.vue'
import { useAccountDeleteMutation } from '~/gql/documents/mutations/account/accountDelete'
import { useProfilePictureSetMutation } from '~/gql/documents/mutations/profilePicture/profilePictureSet'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'

export const usePageBreadcrumb = () => {
  const route = useRoute()

  return {
    label: {
      de: 'Bearbeiten',
      en: 'Edit',
    },
    to: `/accounts/${route.params.username as string}/settings`,
  }
}
</script>

<script setup lang="ts">
definePageMeta({
  async validate(route) {
    return await validateAccountExistence({
      isAuthorizationRequired: true,
      route,
    })
  },
})

const store = useMaevsiStore()
const { signOut } = useSignOut()
const { t, locale } = useI18n()
const route = useRoute()
const accountDeleteMutation = useAccountDeleteMutation()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// api data
const accountByUsernameQuery = await useAccountByUsernameQuery({
  username: route.params.username as string,
})
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername,
)
const profilePictureSetMutation = useProfilePictureSetMutation()
const api = getApiData([accountByUsernameQuery, profilePictureSetMutation])

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps(
    [
      usePageBreadcrumbHome(),
      usePageBreadcrumbAccounts(),
      usePageBreadcrumbAccountsId(),
      {
        current: true,
        ...usePageBreadcrumb(),
      },
    ],
    locale,
  ),
)
const mutation = accountDeleteMutation
const routeParamUsername = route.params.username as string
const title = t('settings')

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
  formDeleteItemNameDeletion: Konto
  formDeleteItemNameSuccess: Konto
  postgres23503: Dir gehören noch Daten! Lösche erst all deine Veranstaltungen, Kontakte und Bilder.
  postgres28P01: Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
  profilePictureChange: Profilbild ändern
  settings: Bearbeiten
  titleAccountDelete: Konto löschen
  titlePasswordChange: Password des Kontos ändern
en:
  formDeleteItemNameDeletion: account
  formDeleteItemNameSuccess: Account
  postgres23503: There's still some data connected to your account! Delete all your events, contacts and images first.
  postgres28P01: Password incorrect! Check for spelling mistakes.
  profilePictureChange: Change profile picture
  settings: edit
  titleAccountDelete: Delete account
  titlePasswordChange: Change account password
</i18n>
