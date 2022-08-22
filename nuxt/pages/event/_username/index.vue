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
import { useI18n } from 'vue-i18n-composable'

import { defineComponent, reactive, useNuxtApp, useRoute } from '#app'
import { useHead } from '#head'

import { REGEX_SLUG } from '~/plugins/util/validation'

export default defineComponent({
  name: 'IndexPage',
  validate({ params }) {
    return REGEX_SLUG.test(params.username)
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { $router } = useNuxtApp()
    const { t } = useI18n()
    const route = useRoute()

    const data = reactive({
      title: t('title', { name: route.params.username }),
    })

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
          hid: 'og:type',
          property: 'og:type',
          content: 'profile',
        },
        {
          hid: 'profile:username',
          property: 'profile:username',
          content: data.title,
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
