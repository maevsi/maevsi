<template>
  <Loader :api="api" indicator="ping" :classes="classes">
    <LoaderImage
      :alt="t('profilePictureAlt', { username: api.data.accountUsernameById })"
      :aspect="aspect"
      :classes="classes"
      :height="height"
      :src="profilePictureUrl || blankProfilePicture"
      :width="width"
    />
  </Loader>
</template>

<script setup lang="ts">
import blankProfilePicture from '~/assets/images/blank-profile-picture.svg'
import { getProfilePictureItem } from '~/gql/documents/fragments/profilePictureItem'
import { getUploadItem } from '~/gql/documents/fragments/uploadItem'
import { useAccountUsernameByIdQuery } from '~/gql/documents/queries/account/accountUsernameById'
import { useProfilePictureByAccountIdQuery } from '~/gql/documents/queries/profilePicture/profilePictureByAccountId'

export interface Props {
  accountId: string
  aspect?: string
  classes?: string
  height: string
  width: string
}
const props = withDefaults(defineProps<Props>(), {
  aspect: 'aspect-square',
  classes: undefined,
})

const { t } = useI18n()
const TUSD_FILES_URL = useTusdFilesUrl()

// api data
const accountUsernameByIdQuery = await useAccountUsernameByIdQuery({
  accountId: props.accountId,
})
const profilePictureQuery = await useProfilePictureByAccountIdQuery({
  accountId: props.accountId,
})
const api = getApiData([accountUsernameByIdQuery, profilePictureQuery])

// computations
const profilePictureUrl = computed(() => {
  const profilePicture = getProfilePictureItem(
    profilePictureQuery.data.value?.profilePictureByAccountId
  )
  const upload = getUploadItem(profilePicture?.uploadByUploadId)

  return upload?.storageKey ? TUSD_FILES_URL + upload.storageKey : undefined
})
</script>

<i18n lang="yaml">
de:
  profilePictureAlt: Profilbild von {username}.
en:
  profilePictureAlt: "{username}'s profile picture."
</i18n>
