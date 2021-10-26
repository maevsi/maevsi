<template>
  <!-- TODO: create button primary css class in tailwind and use inline-block below for button class itself. -->
  <Button
    :aria-label="ariaLabel"
    button-class="inline-block"
    :disabled="disabled"
    :to="to"
    :type="type"
    @click="$emit('click')"
  >
    <slot v-if="$slots.default" />
    <FontAwesomeIcon v-else :icon="iconId" />
  </Button>
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
      // TODO: remove
      default(): string[] {
        return []
      },
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
