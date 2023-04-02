<template>
  <Loader :api="api" indicator="ping" :classes="classes">
    <LoaderImage
      :alt="t('profilePictureAlt', { username })"
      :aspect="aspect"
      :classes="classes"
      :height="height"
      :src="profilePictureUrl || blankProfilePicture"
      :width="width"
    />
  </Loader>
</template>

<script setup lang="ts">
import { useProfilePictureByUsernameQuery } from '~/gql/generated'
import blankProfilePicture from '~/assets/images/blank-profile-picture.svg'

export interface Props {
  aspect?: string
  classes?: string
  height: string
  username: string
  width: string
}
const props = withDefaults(defineProps<Props>(), {
  aspect: 'aspect-square',
  classes: undefined,
})

const { t } = useI18n()
const TUSD_FILES_URL = useTusdFilesUrl()

// api data
const profilePictureQuery = await useProfilePictureByUsernameQuery({
  variables: {
    username: props.username,
  },
})
const api = getApiData([profilePictureQuery])

// computations
const profilePicture = computed(
  () => profilePictureQuery.data.value?.profilePictureByUsername
)
const profilePictureUrl = computed(() =>
  profilePicture?.value?.uploadStorageKey
    ? TUSD_FILES_URL + profilePicture.value.uploadStorageKey + '++'
    : undefined
)
</script>

<i18n lang="yaml">
de:
  profilePictureAlt: Profilbild von {username}.
en:
  profilePictureAlt: "{username}'s profile picture."
</i18n>
