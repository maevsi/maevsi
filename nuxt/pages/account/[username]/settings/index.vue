<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs
      :prefixes="[
        { name: t('accounts'), to: localePath('/account') },
        {
          name: routeParamUsername,
          to: localePath(`/account/${route.params.username}`),
        },
      ]"
    >
      {{ t('settings') }}
    </Breadcrumbs>
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
      <h1 class="max-w-full overflow-hidden text-ellipsis sm:w-auto">
        {{ routeParamUsername }}
      </h1>
      <ModalImageSelection @submitSuccess="reloadProfilePicture" />
    </div>
    <section>
      <h2>{{ t('titlePasswordChange') }}</h2>
      <FormAccountPasswordChange />
    </section>
    <section>
      <h2>{{ t('titleAccountDelete') }}</h2>
      <FormDelete
        id="deleteAccount"
        :item-name="t('account')"
        :mutation="mutation"
        @success="signOut"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSignOut } from '~/plugins/util/auth'
import { useMaevsiStore } from '~/store'
import { useAccountDeleteMutation } from '~/gql/generated'
import ACCOUNT_IS_EXISTING_QUERY from '~/gql/query/account/accountIsExisting.gql'

definePageMeta({
  async validate(route) {
    const { $urql } = useNuxtApp()
    const store = useMaevsiStore()

    const accountIsExisting = await $urql.value
      .query(ACCOUNT_IS_EXISTING_QUERY, {
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
const { executeMutation: executeMutationAccoutDelete } =
  useAccountDeleteMutation()

// data
const mutation = executeMutationAccoutDelete
const routeParamUsername = route.params.username as string
const title = route.params.username as string

// methods
function reloadProfilePicture() {
  // TODO: cache update (profilePictureByUsername, props.username)
}
function showModalImageSelection() {
  store.modalAdd({ id: 'ModalImageSelection' })
}

// initialization
useHeadDefault(title)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yml">
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
