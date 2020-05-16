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
        <img
          alt="blank profile picture"
          class="flex-none mr-0 sm:mr-4"
          :src="profilePictureUrl"
          width="100"
        >
        <h1 class="mb-0 truncate w-full sm:w-auto">
          {{ $route.params.username }}
        </h1>
      </div>
      <h2>
        Image Uploads
      </h2>
      <ImageUploadGallery :username="$route.params.username" />
    </div>
  </Layout>
</template>

<script>
import AlertGraphql from '~/components/AlertGraphql.vue'
import ImageUploadGallery from '~/components/ImageUploadGallery.vue'

require('@uppy/core/dist/style.css')

export default {
  components: {
    AlertGraphql,
    ImageUploadGallery
  },
  data () {
    return {
      graphqlErrorMessage: undefined,
      profilePictureUrl: '/assets/static/src/assets/blank-profile-picture.svg'
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
  }
}
</script>
