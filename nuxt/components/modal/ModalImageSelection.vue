<template>
  <Modal
    id="ModalImageSelection"
    :is-submit-disabled="!selectedProfilePictureStorageKey"
    :submit-task-provider="setProfilePicture"
    @close="selectedProfilePictureStorageKey = undefined"
    @submit-success="emit('submitSuccess')"
  >
    <ImageUploadGallery
      :allow-deletion="false"
      selectable
      :username="isTesting ? 'username' : routeParamUsername"
      @selection="selectProfilePictureStorageKey"
    />
    <template #header>{{ t('header') }}</template>
  </Modal>
</template>

<script setup lang="ts">
import { useProfilePictureSetMutation } from '~/gql/documents/mutations/profilePicture/profilePictureSet'

const emit = defineEmits<{
  (e: 'submitSuccess'): void
}>()

const route = useRoute()
const config = useRuntimeConfig()
const { t } = useI18n()

// api data
const profilePictureSetMutation = useProfilePictureSetMutation()
getApiData([profilePictureSetMutation])

// data
const isTesting = config.public.isTesting
const routeParamUsername = route.params.username as string
const selectedProfilePictureStorageKey = ref<string | null>()

// methods
const selectProfilePictureStorageKey = (storageKey?: string | null) => {
  selectedProfilePictureStorageKey.value = storageKey
}
const setProfilePicture = async () => {
  await profilePictureSetMutation.executeMutation({
    storageKey: selectedProfilePictureStorageKey.value || '',
  })
}
</script>

<i18n lang="yaml">
de:
  header: Wähle ein Profilbild
en:
  header: Select a profile picture
</i18n>
