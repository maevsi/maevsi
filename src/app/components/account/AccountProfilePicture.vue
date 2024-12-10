<template>
  <Loader :api="api" indicator="ping" :classes="classes">
    <LoaderImage
      :alt="t('profilePictureAlt', { username: account?.username })"
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
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { getProfilePictureItem } from '~/gql/documents/fragments/profilePictureItem'
import { getUploadItem } from '~/gql/documents/fragments/uploadItem'
import { useAccountByIdQuery } from '~/gql/documents/queries/account/accountById'
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
const accountByIdQuery = await useAccountByIdQuery({
  id: props.accountId,
})
const profilePictureQuery = await useProfilePictureByAccountIdQuery({
  accountId: props.accountId,
})
const api = getApiData([accountByIdQuery, profilePictureQuery])
const account = computed(() =>
  getAccountItem(accountByIdQuery.data.value?.accountById),
)

// computations
const profilePictureUrl = computed(() => {
  const profilePicture = getProfilePictureItem(
    profilePictureQuery.data.value?.profilePictureByAccountId,
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
