<template>
  <div class="flex flex-col gap-4">
    <LayoutBreadcrumbs
      :prefixes="[
        { name: t('accounts'), to: localePath('/account') },
        {
          name: routeParamUsername,
          to: localePath(`/account/${route.params.username}`),
        },
      ]"
    >
      {{ t('settings') }}
    </LayoutBreadcrumbs>
    <div class="flex min-w-0 flex-col items-center justify-center sm:flex-row">
      <Button
        :aria-label="t('profilePictureChange')"
        class="sm:mr-4"
        @click="showModalImageSelection"
      >
        <AccountProfilePicture
          classes="h-24 rounded w-24"
          height="96"
          :username="routeParamUsername"
          width="96"
        />
      </Button>
      <h1>
        {{ routeParamUsername }}
      </h1>
      <ModalImageSelection />
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
        :item-name="t('account')"
        :mutation="mutation"
        @success="signOut"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'
import { useAccountDeleteMutation } from '~/gql/documents/mutations/account/accountDelete'
import { accountIsExistingQuery } from '~/gql/documents/queries/account/accountIsExisting'

import { useNuxtApp } from '#app/nuxt'

definePageMeta({
  async validate(route) {
    const { $urql } = useNuxtApp()
    const store = useMaevsiStore()

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

    if (route.params.username !== store.signedInUsername) {
      return abortNavigation({ statusCode: 403 })
    }

    return true
  },
})

const store = useMaevsiStore()
const { signOut } = useSignOut()
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const accountDeleteMutation = useAccountDeleteMutation()

// data
const mutation = accountDeleteMutation
const routeParamUsername = route.params.username as string
const title = route.params.username as string

// methods
const showModalImageSelection = () => {
  store.modals.push({ id: 'ModalImageSelection' })
}

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  account: Konto
  accounts: Konten
  postgres23503: Dir gehören noch Daten! Lösche erst all deine Veranstaltungen, Kontakte und Bilder.
  postgres28P01: Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
  profilePictureChange: Profilbild ändern
  settings: bearbeiten
  titleAccountDelete: Konto löschen
  titlePasswordChange: Password des Kontos ändern
en:
  account: account
  accounts: accounts
  postgres23503: There's still some data connected to your account! Delete all your events, contacts and images first.
  postgres28P01: Password incorrect! Check for spelling mistakes.
  profilePictureChange: Change profile picture
  settings: edit
  titleAccountDelete: Delete account
  titlePasswordChange: Change account password
</i18n>
