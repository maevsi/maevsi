<template>
  <Modal
    id="ModalImageSelection"
    :is-submit-disabled="!!selectedProfilePictureStorageKey"
    :submit-task-provider="setProfilePicture"
    @close="selectedProfilePictureStorageKey = undefined"
    @submitSuccess="$emit('submitSuccess')"
  >
    <ImageUploadGallery
      :allow-deletion="false"
      selectable
      :username="isStorybookActive ? 'username' : routeParamUsername"
      @selection="selectProfilePictureStorageKey"
    />
    <template #header>{{ t('header') }}</template>
  </Modal>
</template>

<script lang="ts">
import consola from 'consola'

import { useProfilePictureSetMutation } from '~/gql/generated'
import { getApiMeta } from '~/plugins/util/util'

export default defineComponent({
  setup() {
    const route = useRoute()
    const profilePictureSetMutation = useProfilePictureSetMutation()
    const config = useRuntimeConfig()
    const { t } = useI18n()

    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...profilePictureSetMutation.data.value,
          },
          ...getApiMeta([profilePictureSetMutation]),
        }
      }),
    }
    const data = reactive({
      isStorybookActive: config.public.isStorybookActive,
      routeParamUsername: route.params.username as string,
      selectedProfilePictureStorageKey: undefined as string | undefined,
    })
    const methods = {
      selectProfilePictureStorageKey(storageKey: string) {
        data.selectedProfilePictureStorageKey = storageKey
      },
      setProfilePicture: async () => {
        const result = await profilePictureSetMutation.executeMutation({
          storageKey: data.selectedProfilePictureStorageKey || '',
        })

        if (result.error) {
          apiData.api.value.errors.push(result.error)
          consola.error(result.error)
        }
      },
      t,
    }

    return {
      ...apiData,
      ...data,
      ...methods,
    }
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
