<template>
  <div />
</template>

<script lang="ts">
import { Context } from '@nuxt/types'

import { defineComponent } from '#app'

export default defineComponent({
  name: 'IndexPage',
  validate({ app, params }: Context): boolean {
    return app.$global.REGEX_SLUG.test(params.username)
  },
})
</script>
