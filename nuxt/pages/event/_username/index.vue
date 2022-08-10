<template>
  <div>
    <Breadcrumbs :prefixes="[{ name: $t('events'), to: '..', append: true }]">
      {{ $route.params.username }}
    </Breadcrumbs>
    <i18n path="title" tag="h1">
      <template #name>
        <AppLink :to="localePath(`/account/${$route.params.username}`)">
          {{ $route.params.username }}
        </AppLink>
      </template>
    </i18n>
    <EventList :username="$route.params.username" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'

import { REGEX_SLUG } from '~/plugins/util/validation'

export default defineComponent({
  name: 'IndexPage',
  validate({ params }) {
    return REGEX_SLUG.test(params.username)
  },
  transition: {
    name: 'layout',
  },
  data() {
    return {
      title: this.$t('title', { name: this.$route.params.username }),
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
          hid: 'og:type',
          property: 'og:type',
          content: 'profile',
        },
        {
          hid: 'profile:username',
          property: 'profile:username',
          content: title,
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
  events: Veranstaltungen
  title: Veranstaltungen von {name}
en:
  events: events
  title: Events by {name}
</i18n>
