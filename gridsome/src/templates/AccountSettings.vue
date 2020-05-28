<template>
  <Layout>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else-if="graphqlErrorMessage !== undefined">
      <AlertGraphql
        :graphql-error-message="graphqlErrorMessage"
        :validation-object="undefined"
      />
    </div>
    <div v-else>
      <div class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4">
        <button
          class="mr-0 sm:mr-4"
          @click="showModalImageSelection = true"
        >
          <ProfilePicture
            ref="profilePicture"
            :username="this.$route.params.username"
          />
        </button>
        <h1 class="mb-0 truncate w-full sm:w-auto">
          {{ $route.params.username }}
        </h1>
      </div>
      <h2>
        Image Uploads
      </h2>
      <ModalImageSelection
        v-if="showModalImageSelection"
        :modal-hide-function="hideModalImageSelection"
        :reload-function="reloadProfilePicture"
      />
      <!-- "ImageUploadGallery" must come after "ModalImageSelection"! -->
      <ImageUploadGallery
        :deletion-function="reloadProfilePicture"
        :username="$route.params.username"
      />
    </div>
  </Layout>
</template>

<script>
import AlertGraphql from '~/components/AlertGraphql.vue'
import ImageUploadGallery from '~/components/ImageUploadGallery.vue'
import ModalImageSelection from '~/components/ModalImageSelection.vue'
import ProfilePicture from '~/components/ProfilePicture.vue'

require('@uppy/core/dist/style.css')

export default {
  components: {
    AlertGraphql,
    ImageUploadGallery,
    ModalImageSelection,
    ProfilePicture
  },
  data () {
    return {
      graphqlErrorMessage: undefined,
      profilePictureUrl: this.PROFILE_PICTURE_BLANK_URL,
      showModalImageSelection: false
    }
  },
  created () {
    const routeUsername = this.$route.params.username

    this.$jwtDecode((jwt, jwtDecoded) => {
      if (jwtDecoded.username !== routeUsername) {
        this.$router.push('.')
      }
    })
  },
  metaInfo () {
    return { title: this.$route.params.username }
  },
  methods: {
    hideModalImageSelection () {
      this.showModalImageSelection = false
    },
    reloadProfilePicture () {
      this.$refs.profilePicture.reloadProfilePicture()
    }
  }
}
</script>
