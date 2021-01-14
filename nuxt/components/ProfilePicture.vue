<template>
  <!-- TODO: https://github.com/maevsi/maevsi/issues/96 for html validity inside button -->
  <Loader
    v-if="$apollo.loading || graphqlErrorMessage"
    :error-message="graphqlErrorMessage"
    indicator="ping"
  />
  <LoaderImage
    v-else
    :alt="$t('profilePictureAlt', { username })"
    :class="{ 'rounded-full': rounded }"
    :src="imageSrc"
  />
</template>

<script>
import PROFILE_PICTURE_BY_USERNAME_QUERY from '~/gql/query/profilePictureByUsername'

const consola = require('consola')

export default {
  apollo: {
    profilePictureByUsername() {
      return {
        query: PROFILE_PICTURE_BY_USERNAME_QUERY,
        variables: {
          username: this.username,
        },
        update: (data) => {
          const profilePictureByUsername = this.$global.getNested(
            data,
            'profilePictureByUsername'
          )

          if (profilePictureByUsername) {
            this.profilePictureUrl =
              this.$global.TUSD_FILES_URL +
              profilePictureByUsername.uploadStorageKey +
              '+'
          } else {
            this.profilePictureUrl = undefined
          }
        },
        error(error, _vm, _key, _type, _options) {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        },
      }
    },
  },
  props: {
    rounded: {
      type: Boolean,
      default: undefined,
    },
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
      this.$apollo.queries.profilePictureByUsername.refetch()
    },
  },
}
</script>

<i18n lang="yml">
de:
  profilePictureAlt: 'Das Profilbild von {username}.'
en:
  profilePictureAlt: "{username}'s profile picture."
</i18n>
