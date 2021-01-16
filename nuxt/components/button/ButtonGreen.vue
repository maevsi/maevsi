<template>
  <Button
    :button-class="buttonClass"
    :disabled="disabled"
    :icon-id="iconId"
    :to="to"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
  </Button>
</template>

<script>
export default {
  props: {
    buttonClass: {
      type: String,
      default: 'bg-green-600 disabled:bg-green-600 hover:bg-green-700',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconId: {
      type: Array,
      default: undefined,
    },
    to: {
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
