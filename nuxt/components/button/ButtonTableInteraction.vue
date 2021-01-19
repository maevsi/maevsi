<template>
  <Button
    button-class="h-8 m-0 p-0 w-8"
    :disabled="disabled"
    :icon-id="iconId"
    @click="$emit('click')"
  >
    <slot />
  </Button>
</template>

<script>
export default {
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    iconId: {
      required: true,
      type: Array,
    },
  },
}
</script>
