<template>
  <button
    :aria-label="ariaLabel"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <FontAwesomeIcon :icon="iconId" :size="iconSize" />
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
      required: true,
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
