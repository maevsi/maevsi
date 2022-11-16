<template>
  <Modal
    id="ModalImageSelection"
    :is-submit-disabled="!selectedProfilePictureStorageKey"
    :submit-task-provider="setProfilePicture"
    @close="selectedProfilePictureStorageKey = undefined"
    @submitSuccess="emit('submitSuccess')"
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
import consola from 'consola'

import { useProfilePictureSetMutation } from '~/gql/generated'

const emit = defineEmits<{
  (e: 'submitSuccess'): void
}>()

const route = useRoute()
const profilePictureSetMutation = useProfilePictureSetMutation()
const config = useRuntimeConfig()
const { t } = useI18n()

// api data
const api = computed(() =>
  reactive({
    data: {
      ...profilePictureSetMutation.data.value,
    },
    ...getApiMeta([profilePictureSetMutation]),
  })
)

// data
const isTesting = config.public.isTesting
const routeParamUsername = route.params.username as string
const selectedProfilePictureStorageKey = ref<string>()

// methods
function selectProfilePictureStorageKey(storageKey?: string) {
  selectedProfilePictureStorageKey.value = storageKey
}
async function setProfilePicture() {
  const result = await profilePictureSetMutation.executeMutation({
    storageKey: selectedProfilePictureStorageKey.value || '',
  })

  if (result.error) {
    api.value.errors.push(result.error)
    consola.error(result.error)
  }
}
</script>

<i18n lang="yaml">
de:
  cancel: Abbrechen
  header: Wähle ein Profilbild
  select: Auswählen
en:
  cancel: Cancel
  header: Select a profile picture
  select: Select
</i18n>
