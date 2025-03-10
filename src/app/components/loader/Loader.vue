<template>
  <div>
    <div v-if="api.isFetching" :class="classes">
      <LoaderIndicatorPing v-if="indicator === 'ping'" />
      <LoaderIndicatorSpinner v-else-if="indicator === 'spinner'" />
      <LoaderIndicatorText v-else-if="indicator === 'text'" />
      <LoaderIndicatorText v-else />
    </div>
    <CardStateAlert v-if="errorMessages.length">
      <SpanList :span="errorMessages" />
    </CardStateAlert>
    <slot v-if="api.data" /><!--  && Object.keys(api.data).length -->
  </div>
</template>

<script setup lang="ts">
import type { UnwrapRef } from 'vue'

export interface Props {
  api: UnwrapRef<ReturnType<typeof getApiData>>
  errorPgIds?: Record<string, string>
  classes?: string
  indicator?: string
}
const props = withDefaults(defineProps<Props>(), {
  errorPgIds: undefined,
  classes: undefined,
  indicator: undefined,
})

// computations
const errorMessages = computed(() =>
  getCombinedErrorMessages(props.api.errors, props.errorPgIds),
)
</script>

<script lang="ts">
export default {
  name: 'AppLoader',
}
</script>
