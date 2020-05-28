<template>
  <img
    alt="profile picture"
    class="bg-gray-400 flex-none h-24 w-24"
    :src="profilePictureUrl"
  >
</template>

<script>
import { ALL_PROFILE_PICTURES } from '~/apollo/documents'

export default {
  apollo: {
    allProfilePictures () {
      return {
        query: ALL_PROFILE_PICTURES,
        variables: {
          username: this.username
        },
        update: data => {
          if (this.$checkNested(data.allProfilePictures, 'nodes') && data.allProfilePictures.nodes.length > 0) {
            this.profilePictureUrl = this.TUSD_FILES_URL + data.allProfilePictures.nodes[0].uploadStorageKey + '+'
          } else {
            this.profilePictureUrl = this.PROFILE_PICTURE_BLANK_URL
          }
        },
        error (error, vm, key, type, options) {
          this.graphqlErrorMessage = error.message
        }
      }
    }
  },
  props: {
    username: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      graphqlErrorMessage: undefined,
      profilePictureUrl: this.PROFILE_PICTURE_BLANK_URL
    }
  },
  methods: {
    reloadProfilePicture () {
      this.$apollo.queries.allProfilePictures.refetch()
    }
  }
}
</script>
