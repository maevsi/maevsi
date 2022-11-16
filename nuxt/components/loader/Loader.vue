<template>
  <div>
    <div v-if="api.isFetching" class="aspect-square" :class="classes">
      <LoaderIndicatorPing v-if="indicator === 'ping'" />
      <LoaderIndicatorSpinner v-else-if="indicator === 'spinner'" />
      <LoaderIndicatorText v-else-if="indicator === 'text'" />
      <LoaderIndicatorText v-else />
    </div>
    <CardStateAlert v-if="errorMessages.length">
      <SpanList :span="errorMessages" />
    </CardStateAlert>
    <slot v-if="api.data && Object.keys(api.data).length" />
  </div>
</template>

<script setup lang="ts">
import { UnwrapRef } from 'vue'

import { ApiData } from '~/utils/util'

export interface Props {
  api: UnwrapRef<ApiData>
  classes?: string
  indicator?: string
}
const props = withDefaults(defineProps<Props>(), {
  classes: undefined,
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
