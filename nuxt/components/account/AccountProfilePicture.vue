<template>
  <Loader
    v-if="($apollo.loading && !profilePictureByUsername) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
    indicator="ping"
  />
  <LoaderImage
    v-else
    :alt="$t('profilePictureAlt', { username })"
    :class="classComputed"
    :height="height"
    :src="imageSrc"
    :width="width"
  />
</template>

<script lang="ts">
import consola from 'consola'

import PROFILE_PICTURE_BY_USERNAME_QUERY from '~/gql/query/profilePicture/profilePictureByUsername.gql'

import { defineComponent } from '#app'

export default defineComponent({
  apollo: {
    profilePictureByUsername(): any {
      return {
        query: PROFILE_PICTURE_BY_USERNAME_QUERY,
        variables: {
          username: this.username,
        },
        update: (data: any) => {
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
        error(error: any, _vm: any, _key: any, _type: any, _options: any) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  props: {
    classes: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    height: {
      required: true,
      type: String,
    },
    rounded: {
      default: undefined,
      type: Boolean as PropType<boolean | undefined>,
    },
    username: {
      required: true,
      type: String,
    },
    width: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      graphqlError: undefined as any,
      profilePictureUrl: undefined as string | undefined,
    }
  },
  computed: {
    classComputed(): string {
      return [this.classes, ...(this.rounded ? ['rounded-full'] : [])].join(' ')
    },
    imageSrc(): string | any {
      if (this.profilePictureUrl !== undefined) {
        return this.profilePictureUrl
      } else {
        return require('~/static/assets/static/images/blank-profile-picture.svg')
      }
    },
  },
  watch: {
    username() {
      this.reloadProfilePicture()
    },
  },
  created() {
    this.$nuxt.$on('profilePictureReload', this.reloadProfilePicture)
  },
  methods: {
    reloadProfilePicture() {
      this.$apollo.queries.profilePictureByUsername.refetch({
        username: this.username,
      })
    },
  },
})
</script>

<i18n lang="yml">
de:
  profilePictureAlt: Das Profilbild von {username}.
en:
  profilePictureAlt: "{username}'s profile picture."
</i18n>
