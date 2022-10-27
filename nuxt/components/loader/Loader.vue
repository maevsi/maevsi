<template>
  <div>
    <div v-if="api.isFetching">
      <LoaderIndicatorPing v-if="indicator === 'ping'" />
      <LoaderIndicatorSpinner v-else-if="indicator === 'spinner'" />
      <LoaderIndicatorText v-else-if="indicator === 'text'" />
      <LoaderIndicatorText v-else />
    </div>
    <CardStateAlert v-if="errorMessages.length">
      <SpanList :span="errorMessages" />
    </CardStateAlert>
    <slot v-if="Object.keys(api.data).length" />
  </div>
</template>

<script setup lang="ts">
import { CombinedError } from '@urql/core/dist/types/utils/error'

import { useGetCombinedErrorMessages } from '~/plugins/util/util'

export interface Props {
  api?: {
    data: Object
    errors: (CombinedError | { errcode: string; message: string })[]
    isFetching: boolean
  }
  indicator?: string
}
const props = withDefaults(defineProps<Props>(), {
  api: () => ({
    data: {},
    errors: [],
    isFetching: false,
  }),
  indicator: undefined,
})

const { getCombinedErrorMessages } = useGetCombinedErrorMessages()

// computations
const errorMessages = computed(() => getCombinedErrorMessages(props.api.errors))
</script>

<script lang="ts">
export default {
  name: 'MaevsiLoader',
}
</script>
