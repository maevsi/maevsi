<template>
  <div>
    <h1>{{ $route.params.event_group_name }}</h1>
    <p>{{ $t('futureEventGroups') }}</p>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'

import { defineComponent } from '#app'

export default defineComponent({
  validate({ app, params }: Context): boolean {
    return app.$util.REGEX_SLUG.test(params.username)
  },
  head() {
    return { title: this.$route.params.event_group_name }
  },
})
</script>

<i18n lang="yml">
de:
  futureEventGroups: Es ist noch nicht möglich Veranstaltungsgruppen anzuzeigen. Ohren steifhalten!
en:
  futureEventGroups: "It's not yet possible to view event groups. Stay tuned!"
</i18n>
