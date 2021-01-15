<template>
  <Modal @close="$emit('hide')">
    <h2 slot="header" class="text-center">{{ $t('header') }}</h2>
    <ImageUploadGallery
      :allow-addition="false"
      :allow-deletion="false"
      selectable
      :username="$route.params.username"
      @selection="selectProfilePictureStorageKey"
    />
    <template slot="footer" class="text-text-bright">
      <Button
        :disabled="settingProfilePicture"
        :icon-id="['fas', 'window-close']"
        @click="$emit('hide')"
      >
        {{ $t('cancel') }}
      </Button>
      <ButtonGreen
        :disabled="
          settingProfilePicture ||
          selectedProfilePictureStorageKey === undefined
        "
        :icon-id="['fas', 'check-circle']"
        @click="setProfilePicture()"
      >
        {{ $t('select') }}
      </ButtonGreen>
    </template>
    <div v-if="graphqlErrorMessage !== undefined">
      <CardAlert
        class="mt-4"
        :error-message="graphqlErrorMessage"
        :validation-object="$v.form"
      />
    </div>
  </Modal>
</template>

<script>
import PROFILE_PICTURE_SET_MUTATION from '~/gql/mutation/profilePictureSet'

const consola = require('consola')

export default {
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
          mutation: PROFILE_PICTURE_SET_MUTATION,
          variables: {
            storageKey: this.selectedProfilePictureStorageKey,
          },
        })
        .then((_data) => {
          this.$emit('reload')
          this.$emit('hide')
        })
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })
        .finally(() => {
          this.settingProfilePicture = false
        })
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
