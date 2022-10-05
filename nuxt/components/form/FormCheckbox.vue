<template>
  <div>
    <input
      :id="`input-${formKey}`"
      autocomplete="off"
      class="rounded"
      type="checkbox"
      :checked="value"
      @change="onChange"
    />
    <label class="pl-2" :for="`input-${formKey}`"><slot /></label>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'

export default defineComponent({
  props: {
    formKey: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    value: {
      default: undefined,
      type: Boolean as PropType<boolean | undefined>,
    },
  },
  setup(_props, { emit }) {
    const methods = {
      onChange(payload: Event) {
        emit('change', (payload.target as HTMLInputElement).checked)
      },
    }

    return {
      ...methods,
    }
  },
})
</script>
