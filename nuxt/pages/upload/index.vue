<template>
  <div>
    <section>
      <h2>{{ $t('titleImageUploads') }}</h2>
      <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
      <ImageUploadGallery :username="$route.params.username" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware({ error, store }) {
    if (!store.getters.signedInUsername) {
      return error({ statusCode: 403 })
    }
  },
  data() {
    return {
      title: this.$t('titleImageUploads'),
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
  titleImageUploads: Hochgeladene Bilder
en:
  titleImageUploads: Image uploads
</i18n>
