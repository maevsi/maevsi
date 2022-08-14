<template>
  <div>
    <h1>{{ $route.params.event_group_name }}</h1>
    <p>{{ $t('futureEventGroups') }}</p>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import { useHead } from '@vueuse/head'

import { defineComponent, useRoute } from '#app'

import { REGEX_SLUG } from '~/plugins/util/validation'

export default defineComponent({
  validate({ params }: Context): boolean {
    return REGEX_SLUG.test(params.username)
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const route = useRoute()

    useHead({
      title: route.params.event_group_name,
    })
  },
})
</script>

<i18n lang="yml">
de:
  futureEventGroups: Es ist noch nicht möglich Veranstaltungsgruppen anzuzeigen. Ohren steifhalten!
en:
  futureEventGroups: "It's not yet possible to view event groups. Stay tuned!"
</i18n>
