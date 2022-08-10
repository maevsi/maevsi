<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <ContactList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'
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
})
</script>

<i18n lang="yml">
de:
  title: Kontaktbuch
en:
  title: Contact book
</i18n>
