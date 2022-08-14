<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
    <ImageUploadGallery
      :username="signedInUsername()"
      @deletion="$nuxt.$emit('profilePictureReload')"
    />
  </div>
</template>

<script lang="ts">
import { useHead } from '@vueuse/head'
import { mapGetters } from 'vuex'
import { useI18n } from 'vue-i18n-composable'

import { defineComponent, reactive, useNuxtApp } from '#app'

export default defineComponent({
  name: 'IndexPage',
  middleware({ error, store }) {
    if (!store.getters.signedInUsername) {
      return error({ statusCode: 403 })
    }
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { $router } = useNuxtApp()
    const { t } = useI18n()

    const data = reactive({
      title: t('title'),
    })
    const computations = {
      ...mapGetters(['signedInUsername']),
    }

    useHead({
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: data.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            $router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: data.title,
        },
      ],
      title: data.title,
    })

    return {
      ...data,
      ...computations,
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
