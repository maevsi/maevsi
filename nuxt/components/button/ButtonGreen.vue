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
      default: 'bg-green-600 disabled:bg-green-600 hover:bg-green-700',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    iconId: {
      default: undefined,
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
