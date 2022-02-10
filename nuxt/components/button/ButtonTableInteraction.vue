<template>
  <ButtonIcon
    :aria-label="ariaLabel"
    :disabled="disabled"
    :title="isTitleShow ? ariaLabel : undefined"
    @click="$emit('click')"
  >
    <slot />
  </ButtonIcon>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  props: {
    ariaLabel: {
      required: true,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    isTitleShow: {
      default: false,
      type: Boolean,
    },
  },
})
</script>
