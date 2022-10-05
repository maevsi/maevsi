<template>
  <Error :status-code="error?.statusCode ? +error?.statusCode : undefined" />
</template>

<script lang="ts">
import { PropType } from 'vue'

type Error = { statusCode: string }

export default defineComponent({
  name: 'MaevsiError',
  props: {
    error: {
      default: undefined,
      type: Object as PropType<Error | undefined>,
    },
  },
  setup(props) {
    useHead({
      title: props.error?.statusCode?.toString(),
    })
  },
})
</script>
