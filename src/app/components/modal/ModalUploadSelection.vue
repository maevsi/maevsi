<template>
  <Modal
    id="ModalUploadSelection"
    :is-submit-disabled="!selectedUploadId"
    @close="selectedUploadId = undefined"
    @submit-success="emit('select', selectedUploadId)"
  >
    <UploadGallery
      is-readonly
      is-selectable
      @selection="selectProfilePictureUploadId"
    />
    <template #header>{{ t('header') }}</template>
  </Modal>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  select: [uploadId?: string | null]
}>()

const { t } = useI18n()

// data
const selectedUploadId = ref<string | null>()

// methods
const selectProfilePictureUploadId = (storageKey?: string | null) => {
  selectedUploadId.value = storageKey
}
</script>

<i18n lang="yaml">
de:
  header: Wähle ein Profilbild
en:
  header: Select a profile picture
</i18n>
