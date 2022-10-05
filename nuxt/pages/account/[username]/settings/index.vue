<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs
      :prefixes="[
        { name: t('accounts'), to: '../..', append: true },
        { name: routeParamUsername, to: '..', append: true },
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
      <ModalImageSelection
        @submitSuccess="$nuxt.$emit('profilePictureReload')"
      />
    </div>
    <section>
      <h2>{{ t('titlePasswordChange') }}</h2>
      <FormAccountPasswordChange />
    </section>
    <section>
      <h2>{{ t('titleAccountDelete') }}</h2>
      <FormDelete
        id="deleteAccount"
        :errors="api.errors"
        :item-name="t('account')"
        :mutation="mutation"
        @error="onDeleteError"
        @success="signOut"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { CombinedError } from '@urql/core'

import { useSignOut } from '~/plugins/util/auth'
import { getApiMeta } from '~/plugins/util/util'
import { useMaevsiStore } from '~/store'
import {
  useAccountDeleteMutation,
  useAccountIsExistingQuery,
} from '~~/gql/generated'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const { ssrContext } = useNuxtApp()
      const route = useRoute()
      const store = useMaevsiStore()

      if (
        ssrContext &&
        ssrContext.event.res &&
        route.params.username !== store.signedInUsername
      ) {
        return abortNavigation() // TODO: { statusCode: 403 } or navigateTo('', { statusCode: 403 })
      }

      const accountIsExisting = useAccountIsExistingQuery({
        variables: {
          username: route.params.username as string,
        },
      }).executeQuery()

      if (
        accountIsExisting.error ||
        accountIsExisting.data.value?.accountIsExisting
      ) {
        return abortNavigation() // TODO: { statusCode: 403 }
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const store = useMaevsiStore()
    const { signOut } = useSignOut()
    const { t } = useI18n()
    const route = useRoute()
    const { executeMutation: executeMutationAccoutDelete } =
      useAccountDeleteMutation()

    const apiData = {
      api: computed(() => {
        return {
          ...getApiMeta([]),
        }
      }),
    }
    const data = reactive({
      mutation: executeMutationAccoutDelete,
      routeParamUsername: route.params.username as string,
      title:
        route.params.username === store.signedInUsername
          ? route.params.username
          : '403',
    })
    const methods = {
      onDeleteError(error: CombinedError) {
        apiData.api.value.errors.push(error)
      },
      showModalImageSelection() {
        store.modalAdd({ id: 'ModalImageSelection' })
      },
      signOut,
      t,
    }

    useHeadDefault(data.title)

    return {
      ...apiData,
      ...data,
      ...methods,
    }
  },
})
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
  postgres23503: You still own data! First delete all your events, contacts and images.
  postgres28P01: Password incorrect! Check that you have written everything correctly.
  profilePictureChange: Change profile picture
  settings: edit
  titleAccountDelete: Delete account
  titlePasswordChange: Change account password
</i18n>
