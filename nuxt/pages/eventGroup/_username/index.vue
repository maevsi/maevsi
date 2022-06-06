<template>
  <div />
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'

import { defineComponent } from '#app'

export default defineComponent({
  name: 'IndexPage',
  validate({ app, params }: Context): boolean {
    return app.$util.REGEX_SLUG.test(params.username)
  },
  transition: {
    name: 'layout',
  },
})
</script>
