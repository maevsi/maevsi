<template>
  <button
    :aria-label="ariaLabel"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <slot v-if="$slots.default" />
    <FontAwesomeIcon v-else :icon="iconId" :size="iconSize" />
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
      default: () => [],
      type: Array,
    },
    iconSize: {
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
