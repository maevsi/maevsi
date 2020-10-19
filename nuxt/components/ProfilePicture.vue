<template>
  <img
    alt="profile picture"
    class="bg-gray-400 flex-none h-24 w-24"
    :src="imageSrc"
  />
</template>

<script>
import { ALL_PROFILE_PICTURES } from '~/scripts/apollo'

export default {
  apollo: {
    allProfilePictures() {
      return {
        query: ALL_PROFILE_PICTURES,
        variables: {
          username: this.username,
        },
        update: (data) => {
          const allProfilePicturesNodes = this.$global.checkNested(
            data,
            'allProfilePictures',
            'nodes'
          )
          if (allProfilePicturesNodes.length > 0) {
            this.profilePictureUrl =
              this.$global.TUSD_FILES_URL +
              allProfilePicturesNodes[0].uploadStorageKey +
              '+'
          } else {
            this.profilePictureUrl = undefined
          }
        },
        error(error, _vm, _key, _type, _options) {
          this.graphqlErrorMessage = error.message
        },
      }
    },
  },
  props: {
    username: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      graphqlErrorMessage: undefined,
      profilePictureUrl: undefined,
    }
  },
  computed: {
    imageSrc() {
      if (this.profilePictureUrl !== undefined) {
        return this.profilePictureUrl
      } else {
        return require('~/assets/blank-profile-picture.svg')
      }
    },
  },
  methods: {
    reloadProfilePicture() {
      this.$apollo.queries.allProfilePictures.refetch()
    },
  },
}
</script>
