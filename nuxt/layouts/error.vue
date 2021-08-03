<template>
  <Error :status-code="+error.statusCode" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type Error = { statusCode: number }

export default defineComponent({
  props: {
    error: {
      type: Object as PropType<Error | undefined>,
      default: undefined,
    },
  },
  head() {
    const error = this.error as Error | undefined
    return { title: error?.statusCode?.toString() }
  },
})
</script>
