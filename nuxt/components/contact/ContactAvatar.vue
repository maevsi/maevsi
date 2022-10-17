<template>
  <LoaderImage
    :alt="t('profilePictureAlt', { emailAddress })"
    :class="classComputed"
    :height="size"
    :src="imageSrc"
    :width="size"
  />
</template>

<script setup lang="ts">
import blankProfilePicture from '~/assets/images/blank-profile-picture.svg'

export interface Props {
  classes?: string
  emailAddress?: string
  emailAddressHash?: string
  rounded?: boolean
  size: string
}
const props = withDefaults(defineProps<Props>(), {
  classes: undefined,
  emailAddress: undefined,
  emailAddressHash: undefined,
  rounded: undefined,
})

const { t } = useI18n()

// computations
const classComputed = computed(() => {
  return [props.classes, ...(props.rounded ? ['rounded-full'] : [])].join(' ')
})
const imageSrc = computed(() => {
  if (props.emailAddress && props.emailAddressHash) {
    return `https://www.gravatar.com/avatar/${props.emailAddressHash}?d=mp&s=${props.size}`
  } else {
    return blankProfilePicture
  }
})
</script>

<i18n lang="yml">
de:
  profilePictureAlt: Der Avatar von {emailAddress}.
en:
  profilePictureAlt: "{emailAddress}'s avatar."
</i18n>
