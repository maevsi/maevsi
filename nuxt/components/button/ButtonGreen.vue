<template>
  <Button
    :button-class="buttonClass"
    :disabled="disabled"
    :icon-id="iconId"
    :to="to"
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
    link: {
      type: String,
      default: undefined,
    },
  },
}
</script>
