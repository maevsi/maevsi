<template>
  <ButtonPrimary
    :aria-label="ariaLabel"
    :button-class="buttonClass"
    :disabled="disabled"
    :icon-id="iconId"
    :to="to"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
  </ButtonPrimary>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    ariaLabel: {
      required: true,
      type: String,
    },
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
      type: Array as PropType<string[] | undefined>,
    },
    to: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    type: {
      default: 'button',
      type: String,
    },
  },
})
</script>
