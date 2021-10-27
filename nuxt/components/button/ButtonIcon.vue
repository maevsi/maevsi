<template>
  <Button
    :aria-label="ariaLabel"
    :disabled="disabled"
    :to="to"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
  </Button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

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
      type: String,
    },
  },
})
</script>
