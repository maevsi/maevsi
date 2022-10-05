<template>
  <LoaderImage
    :alt="t('profilePictureAlt', { emailAddress })"
    :class="classComputed"
    :height="size"
    :src="imageSrc"
    :width="size"
  />
</template>

<script lang="ts">
import { PropType } from 'vue'

import blankProfilePicture from '~/assets/images/blank-profile-picture.svg'

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
  setup(props) {
    const { t } = useI18n()

    const computations = {
      classComputed: computed(() => {
        return [props.classes, ...(props.rounded ? ['rounded-full'] : [])].join(
          ' '
        )
      }),
      imageSrc: computed(() => {
        if (props.emailAddress && props.emailAddressHash) {
          return `https://www.gravatar.com/avatar/${props.emailAddressHash}?d=mp&s=${props.size}`
        } else {
          return blankProfilePicture
        }
      }),
    }
    const methods = {
      t,
    }

    return {
      ...computations,
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  profilePictureAlt: Der Avatar von {emailAddress}.
en:
  profilePictureAlt: "{emailAddress}'s avatar."
</i18n>
