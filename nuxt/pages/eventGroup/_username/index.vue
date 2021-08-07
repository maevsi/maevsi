<template>
  <div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

export default defineComponent({
  validate({ app, params }: Context): boolean {
    return app.$global.REGEX_SLUG.test(params.username)
  },
})
</script>
