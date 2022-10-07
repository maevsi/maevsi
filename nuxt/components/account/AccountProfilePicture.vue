<template>
  <Loader :api="api" indicator="ping">
    <LoaderImage
      :alt="t('profilePictureAlt', { username })"
      :class="classComputed"
      :height="height"
      :src="imageSrc"
      :width="width"
    />
  </Loader>
</template>

<script setup lang="ts">
import consola from 'consola'

import { getApiMeta } from '~/plugins/util/util'
import { useProfilePictureByUsernameQuery } from '~/gql/generated'
import blankProfilePicture from '~/assets/images/blank-profile-picture.svg'

export interface Props {
  classes?: string
  height: string
  rounded?: boolean
  username: string
  width: string
}
const props = withDefaults(defineProps<Props>(), {
  classes: undefined,
  rounded: undefined,
})

const { $nuxt } = useNuxtApp()
const { t } = useI18n()
const TUSD_FILES_URL = useTusdFilesUrl()

const profilePictureQuery = useProfilePictureByUsernameQuery({
  variables: {
    username: props.username,
  },
})

// api data
const api = computed(() => {
  return {
    data: {
      ...profilePictureQuery.data.value,
    },
    ...getApiMeta([profilePictureQuery]),
  }
})
const profilePicture = computed(
  () => profilePictureQuery.data.value?.profilePictureByUsername
)
// data
const profilePictureUrl = ref(
  profilePicture?.value?.uploadStorageKey
    ? TUSD_FILES_URL + profilePicture.value.uploadStorageKey + '+'
    : undefined
)

// methods
function reloadProfilePicture() {
  // TODO: cache update (profilePictureByUsername, props.username)
}

// computations
const classComputed = computed(() => {
  return [props.classes, ...(props.rounded ? ['rounded-full'] : [])].join(' ')
})
const imageSrc = computed(() => {
  if (profilePictureUrl.value !== undefined) {
    return profilePictureUrl.value
  } else {
    return blankProfilePicture
  }
})

// TODO: store
$nuxt.$on('profilePictureReload', reloadProfilePicture)

// lifecycle
watch(profilePictureQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})
</script>

<i18n lang="yml">
de:
  profilePictureAlt: Profilbild von {username}.
en:
  profilePictureAlt: "{username}'s profile picture."
</i18n>
