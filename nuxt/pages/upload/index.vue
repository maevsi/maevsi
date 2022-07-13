<template>
  <div>
    <Breadcrumbs>
      {{ $t('uploads') }}
    </Breadcrumbs>
    <h1>{{ title }}</h1>
    <!-- "ImageUploadGallery" must come after "ModalImageSelection" for them to overlay properly! -->
    <ImageUploadGallery
      :username="signedInUsername"
      @deletion="$nuxt.$emit('profilePictureReload')"
    />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

import { defineComponent } from '#app'

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
  data() {
    return {
      title: this.$t('title'),
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
  computed: {
    ...mapGetters(['signedInUsername']),
  },
})
</script>

<i18n lang="yml">
de:
  title: Bildgalerie
  uploads: Uploads
en:
  title: Image gallery
  uploads: uploads
</i18n>
