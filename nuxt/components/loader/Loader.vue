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

<script lang="ts">
import { CombinedError } from '@urql/core/dist/types/utils/error'
import { PropType } from 'vue'

import { useGetCombinedErrorMessages } from '~/plugins/util/util'

export default defineComponent({
  name: 'MaevsiLoader',
  props: {
    api: {
      default: () => {
        return {
          data: {},
          errors: [],
          isFetching: false,
        }
      },
      type: Object as PropType<{
        data: Object
        errors: (CombinedError | { errcode: string; message: string })[]
        isFetching: boolean
      }>,
    },
    indicator: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
  setup(props) {
    const { getCombinedErrorMessages } = useGetCombinedErrorMessages()

    const computations = {
      errorMessages: computed(() => getCombinedErrorMessages(props.api.errors)),
    }

    return {
      ...computations,
    }
  },
})
</script>
