<template>
  <div />
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'

import { defineComponent } from '#app'

import { REGEX_SLUG } from '~/plugins/util/validation'

export default defineComponent({
  name: 'IndexPage',
  validate({ params }: Context): boolean {
    return REGEX_SLUG.test(params.username)
  },
  transition: {
    name: 'layout',
  },
})
</script>
