<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
    <!-- TODO: remove username parameter? -->
    <ImageUploadGallery
      v-if="store.jwtDecoded?.role === 'maevsi_account'"
      :username="signedInUsername"
    />
    <LayoutCallToAction
      v-else
      :call-to-action="t('anonymousCta')"
      :call-to-action-description="t('anonymousCtaDescription')"
    />
  </div>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'

const { t } = useI18n()
const store = useMaevsiStore()

// data
const title = t('title')

// computations
// TODO: computed, ref or raw store access?
const signedInUsername = computed(() => store.signedInUsername)

// initialization
useHeadDefault(title)
</script>

<i18n lang="yaml">
de:
  anonymousCta: Finde sie auf maevsi
  anonymousCtaDescription: Gibt es Fotos von dir und deinen Freunden?
  title: Bildgalerie
en:
  anonymousCta: Find them on maevsi
  anonymousCtaDescription: Are there photos of you and your friends?
  title: Image gallery
</i18n>
