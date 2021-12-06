<template>
  <div>
    <div
      class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4"
    >
      <button
        class="sm:mr-4"
        type="button"
        @click="$store.commit('modalAdd', { id: 'ModalImageSelection' })"
      >
        <AccountProfilePicture
          classes="h-24 rounded w-24"
          height="96"
          :username="$route.params.username"
          width="96"
        />
      </button>
      <h1 class="truncate max-w-full sm:w-auto">
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
        :item-name="$t('account')"
        :mutation="accountDeleteMutation"
        @success="$global.signOut($apollo.getClient(), $store)"
      />
    </section>
  </div>
</template>

<script lang="ts">
import ACCOUNT_DELETE_MUTATION from '~/gql/mutation/account/accountDelete.gql'
import ACCOUNT_IS_EXISTING_MUTATION from '~/gql/query/account/accountIsExisting.gql'

import { defineComponent } from '#app'

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
    } = await app.apolloProvider!.defaultClient.query({
      query: ACCOUNT_IS_EXISTING_MUTATION,
      variables: {
        username: params.username,
      },
    })

    return accountIsExisting
  },
  data() {
    return {
      accountDeleteMutation: ACCOUNT_DELETE_MUTATION,
      title:
        this.$route.params.username === this.$store.getters.signedInUsername
          ? this.$route.params.username
          : '403',
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
  titleAccountDelete: Konto löschen
  titlePasswordChange: Password ändern
en:
  account: account
  titleAccountDelete: Delete account
  titlePasswordChange: Change password
</i18n>
