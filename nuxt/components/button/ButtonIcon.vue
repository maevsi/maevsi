<template>
  <button
    :aria-label="ariaLabel"
    class="rounded"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <slot v-if="$slots.default" />
    <FontAwesomeIcon v-else :icon="iconId" />
  </button>
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
    iconId: {
      default(): string[] {
        return []
      },
      type: Array as PropType<string[] | undefined>,
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
