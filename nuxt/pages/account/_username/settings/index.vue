<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs
      :prefixes="[
        { name: $t('accounts'), to: '../..', append: true },
        { name: $route.params.username, to: '..', append: true },
      ]"
    >
      {{ $t('settings') }}
    </Breadcrumbs>
    <div class="flex min-w-0 flex-col items-center justify-center sm:flex-row">
      <Button
        :aria-label="$t('profilePictureChange')"
        class="sm:mr-4"
        @click="$store.commit('modalAdd', { id: 'ModalImageSelection' })"
      >
        <AccountProfilePicture
          classes="h-24 rounded w-24"
          height="96"
          :username="$route.params.username"
          width="96"
        />
      </Button>
      <h1 class="max-w-full overflow-hidden text-ellipsis sm:w-auto">
        {{ $route.params.username }}
      </h1>
      <ModalImageSelection
        @submitSuccess="$nuxt.$emit('profilePictureReload')"
      />
    </div>
    <section>
      <h2>{{ $t('titlePasswordChange') }}</h2>
      <FormAccountPasswordChange />
    </section>
    <section>
      <h2>{{ $t('titleAccountDelete') }}</h2>
      <FormDelete
        id="deleteAccount"
        :errors="api.errors"
        :item-name="$t('account')"
        :mutation="accountDeleteMutation"
        @error="onDeleteError"
        @success="signOut"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, useNuxtApp, useRoute } from '#app'
import { CombinedError } from '@urql/core'

import ACCOUNT_DELETE_MUTATION from '~/gql/mutation/account/accountDelete.gql'
import ACCOUNT_IS_EXISTING_QUERY from '~/gql/query/account/accountIsExisting.gql'
import { useSignOut } from '~/plugins/util/auth'
import { getApiMeta } from '~/plugins/util/util'

export default defineComponent({
  name: 'IndexPage',
  middleware({ error, params, res, store }) {
    if (res && params.username !== store.getters.signedInUsername) {
      return error({ statusCode: 403 })
    }
  },
  async validate({ app, params }) {
    const {
      data: { accountIsExisting },
    } = await app.$urql.value
      .query(ACCOUNT_IS_EXISTING_QUERY, {
        username: params.username,
      })
      .toPromise()

    return accountIsExisting
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { $store } = useNuxtApp()
    const { signOut } = useSignOut()
    const route = useRoute()

    const apiData = {
      api: computed(() => {
        return {
          ...getApiMeta([]),
        }
      }),
    }
    const data = reactive({
      accountDeleteMutation: ACCOUNT_DELETE_MUTATION,
      title:
        route.params.username === $store.getters.signedInUsername
          ? route.params.username
          : '403',
    })
    const methods = {
      onDeleteError(error: CombinedError) {
        apiData.api.value.errors.push(error)
      },
      signOut,
    }

    return {
      ...apiData,
      ...data,
      ...methods,
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
    }
  },
})
</script>

<i18n lang="yml">
de:
  account: Konto
  accounts: Konten
  postgres23503: Dir gehören noch Veranstaltungen! Lösche erst all deine Veranstaltungen.
  postgres28P01: Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
  profilePictureChange: Profilbild ändern
  settings: Einstellungen
  titleAccountDelete: Konto löschen
  titlePasswordChange: Password ändern
en:
  account: account
  accounts: accounts
  postgres23503: You still own events! First delete all your events.
  postgres28P01: Password incorrect! Check that you have written everything correctly.
  profilePictureChange: Change profile picture
  settings: settings
  titleAccountDelete: Delete account
  titlePasswordChange: Change password
</i18n>
