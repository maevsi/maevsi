<template>
  <div>
    <div
      class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4"
    >
      <button
        class="sm:mr-4"
        type="button"
        @click="$refs.modal.isVisible = true"
      >
        <ProfilePicture
          ref="profilePicture"
          class="h-24 w-24"
          :username="$route.params.username"
        />
      </button>
      <h1 class="truncate w-full sm:w-auto">
        {{ $route.params.username }}
      </h1>
      <ModalImageSelection ref="modal" @submitSuccess="reloadProfilePicture" />
    </div>
    <section>
      <h2>{{ $t('titleImageUploads') }}</h2>
      <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
      <ImageUploadGallery
        :username="$route.params.username"
        @deletion="reloadProfilePicture"
      />
    </section>
    <section>
      <h2>{{ $t('titleChangePassword') }}</h2>
      <FormAccountPasswordChange />
    </section>
    <section>
      <h2>{{ $t('titleDangerZone') }}</h2>
      <FormDelete
        id="deleteAccount"
        :item-name="$t('account')"
        :mutation="accountDeleteMutation"
        @success="$global.signOut(this.$apollo.getClient(), this.$store)"
      />
    </section>
  </div>
</template>

<script>
import ACCOUNT_DELETE_MUTATION from '~/gql/mutation/accountDelete'

export default {
  middleware({ app, store, redirect, route }) {
    if (
      !app.$global.getNested(store.state.jwtDecoded, 'username') ||
      store.state.jwtDecoded.username !== route.params.username
    ) {
      return redirect({ append: true, path: '..' })
    }
  },
  data() {
    return {
      accountDeleteMutation: ACCOUNT_DELETE_MUTATION,
    }
  },
  head() {
    return { title: this.$route.params.username }
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
  account: 'Konto'
  titleDangerZone: 'Gefahrenzone'
  titleChangePassword: 'Password ändern'
  titleImageUploads: 'Hochgeladene Bilder'
en:
  account: 'account'
  titleDangerZone: 'Danger zone'
  titleChangePassword: 'Change password'
  titleImageUploads: 'Image uploads'
</i18n>
