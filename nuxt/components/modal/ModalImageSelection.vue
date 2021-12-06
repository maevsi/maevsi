<template>
  <Modal
    id="ModalImageSelection"
    :is-submit-disabled="selectedProfilePictureStorageKey === undefined"
    :submit-task-provider="setProfilePicture"
    @close="selectedProfilePictureStorageKey = undefined"
    @submitSuccess="$emit('submitSuccess')"
  >
    <ImageUploadGallery
      :allow-addition="false"
      :allow-deletion="false"
      selectable
      :username="$route.params.username"
      @selection="selectProfilePictureStorageKey"
    />
    <template slot="header">{{ $t('header') }}</template>
  </Modal>
</template>

<script lang="ts">
import PROFILE_PICTURE_SET_MUTATION from '~/gql/mutation/profilePicture/profilePictureSet.gql'

import { defineComponent } from '#app'

export default defineComponent({
  data() {
    return {
      selectedProfilePictureStorageKey: undefined as string | undefined,
      setProfilePicture: () =>
        this.$apollo.mutate({
          mutation: PROFILE_PICTURE_SET_MUTATION,
          variables: {
            // @ts-ignore
            storageKey: this.selectedProfilePictureStorageKey,
          },
        }),
    }
  },
  methods: {
    selectProfilePictureStorageKey(storageKey: string) {
      this.selectedProfilePictureStorageKey = storageKey
    },
  },
})
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
