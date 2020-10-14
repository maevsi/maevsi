<template>
  <Modal @close="modalHideFunction()">
    <h2 slot="header">Select a profile picture</h2>
    <ImageUploadGallery
      slot="body"
      :allow-addition="false"
      :allow-deletion="false"
      :selection-function="selectProfilePictureStorageKey"
    />
    <div slot="footer" class="text-white">
      <Button
        :disabled="settingProfilePicture"
        :icon-id="['fas', 'window-close']"
        @click.native="modalHideFunction()"
      >
        Cancel
      </Button>
      <ButtonGreen
        :disabled="
          settingProfilePicture ||
          selectedProfilePictureStorageKey === undefined
        "
        :icon-id="['fas', 'check-circle']"
        @click.native="setProfilePicture()"
      >
        Select
      </ButtonGreen>
    </div>
    <div if="graphqlErrorMessage !== undefined">
      <AlertGraphql :graphql-error-message="graphqlErrorMessage" />
    </div>
  </Modal>
</template>

<script>
import { PROFILE_PICTURE_SET } from '~/apollo/documents'
import Button from '~/components/buttons/Button.vue'
import ButtonGreen from '~/components/buttons/ButtonGreen.vue'
import ImageUploadGallery from '~/components/ImageUploadGallery.vue'
import Modal from '~/components/Modal.vue'

export default {
  components: {
    Button,
    ButtonGreen,
    ImageUploadGallery,
    Modal,
  },
  props: {
    modalHideFunction: {
      type: Function,
      default: undefined,
    },
    reloadFunction: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      graphqlErrorMessage: undefined,
      selectedProfilePictureStorageKey: undefined,
      settingProfilePicture: false,
    }
  },
  methods: {
    selectProfilePictureStorageKey(storageKey) {
      this.selectedProfilePictureStorageKey = storageKey
    },
    setProfilePicture() {
      this.settingProfilePicture = true

      this.$apollo
        .mutate({
          mutation: PROFILE_PICTURE_SET,
          variables: {
            storageKey: this.selectedProfilePictureStorageKey,
          },
        })
        .then((_data) => {
          this.reloadFunction()
          this.modalHideFunction()
        })
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          console.error(error)
        })
        .finally(() => {
          this.settingProfilePicture = false
        })
    },
  },
}
</script>
