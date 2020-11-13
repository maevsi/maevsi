<template>
  <div>
    <div v-if="$apollo.loading">{{ $t('globalApolloLoading') }}</div>
    <AlertGraphql
      v-else-if="graphqlErrorMessage !== undefined"
      :graphql-error-message="graphqlErrorMessage"
    />
    <img
      :alt="$t('profilePictureAlt', { username })"
      class="bg-gray-400 flex-none h-24 w-24"
      :src="imageSrc"
    />
  </div>
</template>

<script>
import PROFILE_PICTURE_BY_USERNAME_QUERY from '~/gql/query/profilePictureByUsername'

export default {
  apollo: {
    profilePictureByUsername() {
      return {
        query: PROFILE_PICTURE_BY_USERNAME_QUERY,
        variables: {
          username: this.username,
        },
        update: (data) => {
          const profilePictureByUsername = this.$global.checkNested(
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
