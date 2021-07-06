<template>
  <div v-if="$route.params.username === $store.state.signedInUsername">
    <div
      class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4"
    >
      <button
        class="sm:mr-4"
        type="button"
        @click="$store.commit('modalAdd', { id: 'ModalImageSelection' })"
      >
        <AccountProfilePicture
          ref="profilePicture"
          classes="h-24 w-24"
          height="96"
          :username="$route.params.username"
          width="96"
        />
      </button>
      <h1 class="truncate max-w-full sm:w-auto">
        {{ $route.params.username }}
      </h1>
      <ModalImageSelection @submitSuccess="reloadProfilePicture" />
    </div>
    <section>
      <h2>{{ $t('titleContacts') }}</h2>
      <AccountContacts />
    </section>
    <section>
      <h2>{{ $t('titleImageUploads') }}</h2>
      <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
      <ImageUploadGallery
        :username="$route.params.username"
        @deletion="reloadProfilePicture"
      />
    </section>
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
  <Error v-else :status-code="403" />
</template>

<script>
import ACCOUNT_DELETE_MUTATION from '~/gql/mutation/account/accountDelete.gql'
import ACCOUNT_IS_EXISTING_MUTATION from '~/gql/query/account/accountIsExisting.gql'

export default {
  middleware({ res, params, store }) {
    if (res && params.username !== store.state.signedInUsername) {
      res.statusCode = 403
    }
  },
  async validate({ app, params }) {
    const {
      data: { accountIsExisting },
    } = await app.apolloProvider.defaultClient.query({
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
        this.$route.params.username === this.$store.state.signedInUsername
          ? this.$route.params.username
          : '403',
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
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
          content: this.title,
        },
      ],
      title: this.title,
    }
  },
  methods: {
    reloadProfilePicture() {
      this.$refs.profilePicture.reloadProfilePicture()
    },
  },
}
</script>

<i18n lang="yml">
de:
  account: Konto
  titleAccountDelete: Konto löschen
  titlePasswordChange: Password ändern
  titleContacts: Kontakte
  titleImageUploads: Hochgeladene Bilder
en:
  account: account
  titleAccountDelete: Delete account
  titlePasswordChange: Change password
  titleContacts: Contacts
  titleImageUploads: Image uploads
</i18n>
