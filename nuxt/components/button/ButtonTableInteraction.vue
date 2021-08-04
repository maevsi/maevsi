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

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

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
