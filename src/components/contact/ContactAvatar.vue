<template>
  <LoaderImage
    :alt="t('profilePictureAlt', { emailAddress })"
    :aspect="aspect"
    :classes="classes"
    :cross-origin="crossOrigin"
    :height="size"
    :src="imageSrc"
    :width="size"
  />
</template>

<script setup lang="ts">
import blankProfilePicture from '~/assets/images/blank-profile-picture.svg'

export interface Props {
  aspect?: string
  classes?: string
  emailAddress?: string | null
  emailAddressHash?: string | null
  size: string
}
const props = withDefaults(defineProps<Props>(), {
  aspect: 'aspect-square',
  classes: undefined,
  emailAddress: undefined,
  emailAddressHash: undefined,
})

const { t } = useI18n()

// computations
const imageSrc = computed(() => {
  if (props.emailAddress && props.emailAddressHash)
    return `https://www.gravatar.com/avatar/${props.emailAddressHash}?d=mp&s=${props.size}`

  return blankProfilePicture
})
const crossOrigin = computed(() => {
  if (props.emailAddress && props.emailAddressHash) return 'anonymous'

  return undefined
})
</script>

<i18n lang="yaml">
de:
  profilePictureAlt: Der Avatar von {emailAddress}.
en:
  profilePictureAlt: "{emailAddress}'s avatar."
</i18n>
