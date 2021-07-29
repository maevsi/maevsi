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

<script>
export default {
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
      default() {
        return []
      },
      type: Array,
    },
    to: {
      default: undefined,
      type: String,
    },
    type: {
      default: 'button',
      type: String,
    },
  },
}
</script>
