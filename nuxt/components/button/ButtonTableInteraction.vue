<template>
  <ButtonIcon
    :aria-label="ariaLabel"
    class="h-8 m-2 w-8"
    :disabled="disabled"
    :title="isTitleShow ? ariaLabel : undefined"
    @click="$emit('click')"
  >
    <FontAwesomeIcon :icon="iconId" />
  </ButtonIcon>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

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
    iconId: {
      required: true,
      type: Array as PropType<string[]>,
    },
    isTitleShow: {
      default: false,
      type: Boolean,
    },
  },
})
</script>
