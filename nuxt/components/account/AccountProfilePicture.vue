<template>
  <Loader :api="api" indicator="ping">
    <LoaderImage
      :alt="t('profilePictureAlt', { username })"
      :class="classComputed"
      :height="height"
      :src="profilePictureUrl || blankProfilePicture"
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

const { t } = useI18n()
const TUSD_FILES_URL = useTusdFilesUrl()

// queries
const profilePictureQuery = useProfilePictureByUsernameQuery({
  variables: {
    username: props.username,
  },
})

// api data
const api = computed(() =>
  reactive({
    data: {
      ...profilePictureQuery.data.value,
    },
    ...getApiMeta([profilePictureQuery]),
  })
)

// computations
const classComputed = computed(() => {
  return [props.classes, ...(props.rounded ? ['rounded-full'] : [])].join(' ')
})
const profilePicture = computed(
  () => profilePictureQuery.data.value?.profilePictureByUsername
)
const profilePictureUrl = computed(() =>
  profilePicture?.value?.uploadStorageKey
    ? TUSD_FILES_URL + profilePicture.value.uploadStorageKey + '+'
    : undefined
)

// lifecycle
watch(profilePictureQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})
</script>

<i18n lang="yaml">
de:
  profilePictureAlt: Profilbild von {username}.
en:
  profilePictureAlt: "{username}'s profile picture."
</i18n>
