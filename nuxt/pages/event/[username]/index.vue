<template>
  <div>
    <Breadcrumbs
      :prefixes="[{ name: t('events'), to: '..', isToRelative: true }]"
    >
      {{ routeParamUsername }}
    </Breadcrumbs>
    <i18n-t keypath="title" tag="h1">
      <template #name>
        <AppLink :to="localePath(`/account/${routeParamUsername}`)">
          {{ routeParamUsername }}
        </AppLink>
      </template>
    </i18n-t>
    <EventList :username="routeParamUsername" />
  </div>
</template>

<script setup lang="ts">
import { REGEX_SLUG } from '~/plugins/util/validation'

definePageMeta({
  validate: (route) => REGEX_SLUG.test(route.params.username as string),
})

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

// data
const routeParamUsername = route.params.username as string
const title = t('title', { name: route.params.username })

// initialization
useHeadDefault(title, {
  meta: [
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'profile',
    },
    {
      hid: 'profile:username',
      property: 'profile:username',
      content: route.params.username as string,
    },
  ],
})
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yml">
de:
  events: Veranstaltungen
  title: Veranstaltungen von {name}
en:
  events: events
  title: Events by {name}
</i18n>
