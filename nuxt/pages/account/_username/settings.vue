<template>
  <div>
    <div
      class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4"
    >
      <button class="mr-0 sm:mr-4" @click="showModalImageSelection = true">
        <ProfilePicture
          ref="profilePicture"
          :username="this.$route.params.username"
        />
      </button>
      <ModalImageSelection
        v-if="showModalImageSelection"
        :modal-hide-function="hideModalImageSelection"
        :reload-function="reloadProfilePicture"
      />
      <h1 class="mb-0 truncate w-full sm:w-auto">
        {{ $route.params.username }}
      </h1>
    </div>
    <section>
      <h2>Image Uploads</h2>
      <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
      <ImageUploadGallery
        :deletion-function="reloadProfilePicture"
        :username="$route.params.username"
      />
    </section>
    <section class="mt-4">
      <h2>Change Password</h2>
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
  created() {
    const routeUsername = this.$route.params.username

    this.$global.jwtDecode((_jwt, jwtDecoded) => {
      if (jwtDecoded.username !== routeUsername) {
        this.$router.push('.')
      }
    })
  },
  methods: {
    hideModalImageSelection() {
      this.showModalImageSelection = false
    },
    reloadProfilePicture() {
      this.$refs.profilePicture.reloadProfilePicture()
    },
  },
  head() {
    return { title: this.$route.params.username }
  },
}
</script>
