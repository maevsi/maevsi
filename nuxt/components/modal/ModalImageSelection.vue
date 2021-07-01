<template>
  <Modal
    id="ModalImageSelection"
    :is-storybook="isStorybook"
    :is-submit-disabled="selectedProfilePictureStorageKey === undefined"
    :submit-task-provider="setProfilePicture"
    @close="selectedProfilePictureStorageKey = undefined"
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
import PROFILE_PICTURE_SET_MUTATION from '~/gql/mutation/profilePicture/profilePictureSet.gql'

export default {
  props: {
    isStorybook: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
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
  methods: {
    selectProfilePictureStorageKey(storageKey) {
      this.selectedProfilePictureStorageKey = storageKey
    },
  },
}
</script>

<i18n lang="yml">
de:
  cancel: Abbrechen
  header: Wähle ein Profilbild
  select: Auswählen
en:
  cancel: Cancel
  header: Select a profile picture
  select: Select
</i18n>
