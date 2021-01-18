<template>
  <button
    :class="buttonClass"
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
    buttonClass: {
      default: undefined,
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
