<template>
  <ButtonIcon
    :aria-label="ariaLabel"
    class="h-8 m-2 w-8"
    :disabled="disabled"
    :icon-id="iconId"
    :title="isTitleShow ? ariaLabel : undefined"
    @click="$emit('click')"
  />
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
    isTitleShow: {
      default: false,
      type: Boolean,
    },
  },
}
</script>
