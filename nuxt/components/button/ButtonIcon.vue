<template>
  <Button
    :aria-label="ariaLabel"
    class="flex justify-center"
    :disabled="disabled"
    :title="ariaLabel"
    :to="to"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
  </Button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    ariaLabel: {
      required: true,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    to: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    type: {
      default: 'button',
      type: String as PropType<'button' | 'submit' | 'reset' | undefined>,
    },
  },
})
</script>
