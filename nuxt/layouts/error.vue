<template>
  <Error :status-code="error?.statusCode ? +error?.statusCode : undefined" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

type Error = { statusCode: string }

export default defineComponent({
  name: 'MaevsiError',
  props: {
    error: {
      default: undefined,
      type: Object as PropType<Error | undefined>,
    },
  },
  head() {
    const error = this.error as Error | undefined
    return { title: error?.statusCode?.toString() }
  },
})
</script>
