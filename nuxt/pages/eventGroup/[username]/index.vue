<template>
  <div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { abortNavigation, useRoute } from '#app'

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
  name: 'IndexPage',
})
</script>
