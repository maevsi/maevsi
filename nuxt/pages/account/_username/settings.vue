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
  </div>
</template>

<script>
require('@uppy/core/dist/style.css')

export default {
  data() {
    return {
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
    reloadProfilePicture() {
      this.$refs.profilePicture.reloadProfilePicture()
    },
  },
  middleware({ app, store, redirect, route }) {
    if (
      store.state.jwtDecoded &&
      store.state.jwtDecoded.role !== 'maevsi_account'
    ) {
      return redirect(app.localePath('/account/' + route.params.username))
    }
  },
  head() {
    return { title: this.$route.params.username }
  },
}
</script>

<i18n lang="yml">
de:
  titleChangePassword: 'Password ändern'
  titleImageUploads: 'Hochgeladene Bilder'
en:
  titleChangePassword: 'Change password'
  titleImageUploads: 'Image uploads'
</i18n>
