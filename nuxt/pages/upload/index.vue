<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
    <ImageUploadGallery
      :username="signedInUsername"
      @deletion="$nuxt.$emit('profilePictureReload')"
    />
  </div>
</template>

<script lang="ts">
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const store = useMaevsiStore()

      if (!store.signedInUsername) {
        throw createError({ statusCode: 403 })
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { t } = useI18n()
    const store = useMaevsiStore()

    const data = reactive({
      signedInUsername: store.signedInUsername,
      title: t('title'),
    })

    useHeadDefault(data.title)

    return {
      ...data,
    }
  },
})
</script>

<i18n lang="yml">
de:
  title: Bildgalerie
en:
  title: Image gallery
</i18n>
