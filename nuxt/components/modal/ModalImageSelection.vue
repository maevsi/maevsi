<template>
  <Modal
    ref="modal"
    cancellable
    :is-submit-disabled="selectedProfilePictureStorageKey === undefined"
    :submit-task-provider="setProfilePicture"
    @close="isVisible = false"
    @submitSuccess="$emit('submitSuccess')"
  >
    <h2 slot="header">{{ $t('header') }}</h2>
    <ImageUploadGallery
      :allow-addition="false"
      :allow-deletion="false"
      selectable
      :username="$route.params.username"
      @selection="selectProfilePictureStorageKey"
    />
  </Modal>
</template>

<script>
import PROFILE_PICTURE_SET_MUTATION from '~/gql/mutation/profilePictureSet'

export default {
  data() {
    return {
      isVisible: false,
      selectedProfilePictureStorageKey: undefined,
      setProfilePicture: () =>
        this.$apollo.mutate({
          mutation: PROFILE_PICTURE_SET_MUTATION,
          variables: {
            storageKey: this.selectedProfilePictureStorageKey,
          },
        }),
    }
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.$refs.modal.isVisible = this.isVisible
      } else {
        this.selectedProfilePictureStorageKey = undefined
        // this.$emit('close')
      }
    },
  },
  methods: {
    selectProfilePictureStorageKey(storageKey) {
      this.selectedProfilePictureStorageKey = storageKey
    },
  },
}
</script>

<i18n lang="yml">
de:
  cancel: 'Abbrechen'
  header: 'Wähle ein Profilbild'
  select: 'Auswählen'
en:
  cancel: 'Cancel'
  header: 'Select a profile picture'
  select: 'Select'
</i18n>
