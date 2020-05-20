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
          if (data.allProfilePictures !== undefined) {
            this.profilePictureUrl = this.TUSD_FILES_URL + data.allProfilePictures.nodes[0].uploadStorageKey + '+'
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
      profilePictureUrl: '/assets/static/src/assets/blank-profile-picture.svg'
    }
  },
  methods: {
    reloadProfilePicture () {
      this.$apollo.queries.allProfilePictures.refetch()
    }
  }
}
</script>
