<template>
  <div>
    <h1>{{ routeParamEventGroupName }}</h1>
    <p>{{ $t('futureEventGroups') }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { abortNavigation, useRoute } from '#app'
import { useHead } from '#head'

import { REGEX_SLUG } from '~/plugins/util/validation'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const route = useRoute()

      if (!REGEX_SLUG.test(route.params.username)) {
        return abortNavigation()
      }
    },
  ],
})

export default defineComponent({
  setup() {
    const route = useRoute()

    useHead({
      routeParamEventGroupName: route.params.event_group_name,
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
