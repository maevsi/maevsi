<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
    <ImageUploadGallery :username="signedInUsername" />
  </div>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    defineNuxtRouteMiddleware(() => {
      const store = useMaevsiStore()

      if (!store.signedInUsername) {
        return abortNavigation({ statusCode: 403 })
      }
    }),
  ],
})

const { t } = useI18n()
const store = useMaevsiStore()

// data
const title = t('title')

// computations
const signedInUsername = computed(() => store.signedInUsername)

// initialization
useHeadDefault(title)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yaml">
de:
  title: Bildgalerie
en:
  title: Image gallery
</i18n>
