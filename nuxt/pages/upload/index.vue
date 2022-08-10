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
import { defineComponent, reactive, useNuxtApp } from '#app'
import { useMaevsiStore } from '~/store'

export default defineComponent({
  name: 'IndexPage',
  middleware({ error, $pinia }) {
    const store = useMaevsiStore($pinia)

    if (!store.signedInUsername) {
      return error({ statusCode: 403 })
    }
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { $t } = useNuxtApp()
    const store = useMaevsiStore()

    const data = reactive({
      signedInUsername: store.signedInUsername,
      title: $t('title'),
    })

    return {
      ...data,
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
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
