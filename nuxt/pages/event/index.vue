<template>
  <div>
    <Breadcrumbs>
      {{ $t('events') }}
    </Breadcrumbs>
    <h1>
      {{ title }}
    </h1>
    <EventList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  name: 'IndexPage',
  transition: {
    name: 'layout',
  },
  data() {
    return {
      graphqlError: undefined as Error | undefined,
      title: this.$t('title') as string,
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
    signedIn(): boolean {
      return (
        this.$store.getters.jwtDecoded?.role === 'maevsi_account' &&
        this.$store.getters.jwtDecoded?.exp > Math.floor(Date.now() / 1000)
      )
    },
  },
})
</script>

<i18n lang="yml">
de:
  events: Veranstaltungen
  title: Veranstaltungen
en:
  events: events
  title: Events
</i18n>
