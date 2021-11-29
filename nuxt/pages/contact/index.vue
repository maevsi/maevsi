<template>
  <div>
    <h1>{{ title }}</h1>
    <ContactList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IndexPage',
  middleware({ error, store }) {
    if (!store.getters.signedInUsername) {
      return error({ statusCode: 403 })
    }
  },
  data() {
    return {
      title: this.$t('titleContacts'),
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
  titleContacts: Kontakte
en:
  titleContacts: Contacts
</i18n>
