<template>
  <LoaderImage
    :alt="$t('profilePictureAlt', { emailAddress })"
    :class="classComputed"
    :height="size"
    :src="imageSrc"
    :width="size"
  />
</template>

<script>
export default {
  props: {
    classes: {
      default: undefined,
      type: String,
    },
    emailAddress: {
      default: undefined,
      type: String,
    },
    emailAddressHash: {
      default: undefined,
      type: String,
    },
    rounded: {
      default: undefined,
      type: Boolean,
    },
    size: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      graphqlError: undefined,
    }
  },
  computed: {
    classComputed() {
      return [this.classes, ...(this.rounded ? ['rounded-full'] : [])].join(' ')
    },
    imageSrc() {
      if (this.emailAddress && this.emailAddressHash) {
        return `https://www.gravatar.com/avatar/${this.emailAddressHash}?d=mp&s=${this.size}`
      } else {
        return require('~/static/assets/static/images/blank-profile-picture.svg')
      }
    },
  },
}
</script>

<i18n lang="yml">
de:
  profilePictureAlt: Der Avatar von {emailAddress}.
en:
  profilePictureAlt: "{emailAddress}'s avatar."
</i18n>
