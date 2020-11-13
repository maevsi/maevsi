<template>
  <div>
    <div
      class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4"
    >
      <button class="mr-0 sm:mr-4" @click="showModalImageSelection = true">
        <ProfilePicture
          ref="profilePicture"
          :username="$route.params.username"
        />
      </button>
      <ModalImageSelection
        v-if="showModalImageSelection"
        @hide="hideModalImageSelection"
        @reload="reloadProfilePicture"
      />
      <h1 class="mb-0 truncate w-full sm:w-auto">
        {{ $route.params.username }}
      </h1>
    </div>
    <section>
      <h2>{{ $t('titleImageUploads') }}</h2>
      <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
      <ImageUploadGallery
        :username="$route.params.username"
        @deletion="reloadProfilePicture"
      />
    </section>
    <section class="mt-4">
      <h2>{{ $t('titleChangePassword') }}</h2>
      <PasswordChange />
    </section>
    <section class="mt-4">
      <h2>{{ $t('titleDangerZone') }}</h2>
      <Delete
        :id="'deleteAccount'"
        :item-name="$t('account')"
        :mutation="mutation"
        @success="onDeleteSuccess"
      />
    </section>
  </div>
</template>

<script>
import ACCOUNT_DELETE_MUTATION from '~/gql/mutation/accountDelete'

require('@uppy/core/dist/style.css')

export default {
  data() {
    return {
      mutation: ACCOUNT_DELETE_MUTATION,
      showModalImageSelection: false,
    }
  },
  computed: {
    jwtDecoded() {
      return this.$store.state.jwtDecoded
    },
  },
  methods: {
    hideModalImageSelection() {
      this.showModalImageSelection = false
    },
    onDeleteSuccess() {
      this.$router.push(this.localePath(`/account`))
      // TODO: Clear apollo.
    },
    reloadProfilePicture() {
      this.$refs.profilePicture.reloadProfilePicture()
    },
  },
  middleware({ app, store, redirect, route }) {
    if (
      !app.$global.checkNested(store.state.jwtDecoded, 'username') ||
      store.state.jwtDecoded.username !== route.params.username
    ) {
      return redirect({ append: true, path: '..' })
    }
  },
  head() {
    return { title: this.$route.params.username }
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
