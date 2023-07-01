<template>
  <Modal
    id="ModalImageSelection"
    :is-submit-disabled="!selectedProfilePictureUploadId"
    :submit-task-provider="setProfilePicture"
    @close="selectedProfilePictureUploadId = undefined"
    @submit-success="emit('submitSuccess')"
  >
    <ImageUploadGallery
      :allow-deletion="false"
      selectable
      :username="
        runtimeConfig.public.vio.isTesting ? 'username' : routeParamUsername
      "
      @selection="selectProfilePictureUploadId"
    />
    <template #header>{{ t('header') }}</template>
  </Modal>
</template>

<script setup lang="ts">
import { useProfilePictureSetMutation } from '~/gql/documents/mutations/profilePicture/profilePictureSet'

const emit = defineEmits<{
  submitSuccess: []
}>()

const route = useRoute()
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()

// api data
const profilePictureSetMutation = useProfilePictureSetMutation()
getApiData([profilePictureSetMutation])

// data
const routeParamUsername = route.params.username as string
const selectedProfilePictureUploadId = ref<string | null>()

// methods
const selectProfilePictureUploadId = (storageKey?: string | null) => {
  selectedProfilePictureUploadId.value = storageKey
}
const setProfilePicture = async () => {
  await profilePictureSetMutation.executeMutation({
    uploadId: selectedProfilePictureUploadId.value,
  })
}
</script>

<i18n lang="yaml">
de:
  header: Wähle ein Profilbild
en:
  header: Select a profile picture
</i18n>
