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
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconId: {
      type: Array,
      required: true,
    },
    iconSize: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
}
</script>
