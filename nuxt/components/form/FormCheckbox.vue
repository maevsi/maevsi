<template>
  <div>
    <input
      :id="`input-${formKey}`"
      autocomplete="off"
      class="rounded"
      type="checkbox"
      :checked="value"
      @change="$emit('change', $event.target.checked)"
    />
    <label class="pl-2" :for="`input-${formKey}`"><slot /></label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

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
})
</script>
