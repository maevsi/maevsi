<template>
  <LoaderImage
    :alt="$t('profilePictureAlt', { emailAddress })"
    :class="classComputed"
    :height="size"
    :src="imageSrc"
    :width="size"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    classes: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    emailAddress: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    emailAddressHash: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    rounded: {
      default: undefined,
      type: Boolean as PropType<boolean | undefined>,
    },
    size: {
      required: true,
      type: String,
    },
  },
  data() {
    const graphqlError: string | undefined = undefined
    return {
      graphqlError,
    }
  },
  computed: {
    classComputed(): string {
      return [this.classes, ...(this.rounded ? ['rounded-full'] : [])].join(' ')
    },
    imageSrc(): string {
      if (this.emailAddress && this.emailAddressHash) {
        return `https://www.gravatar.com/avatar/${this.emailAddressHash}?d=mp&s=${this.size}`
      } else {
        return require('~/static/assets/static/images/blank-profile-picture.svg')
      }
    },
  },
})
</script>

<i18n lang="yml">
de:
  profilePictureAlt: Der Avatar von {emailAddress}.
en:
  profilePictureAlt: "{emailAddress}'s avatar."
</i18n>
