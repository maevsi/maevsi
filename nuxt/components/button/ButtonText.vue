<template>
  <Button
    ref="button"
    :append="append"
    :aria-label="ariaLabel"
    class="font-medium px-4 py-2"
    :class="
      [
        ...(isBlock ? ['block'] : ['inline-block']),
        ...(buttonClass ? [buttonClass] : []),
      ].join(' ')
    "
    :disabled="disabled"
    :to="to"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
    <template slot="prefix">
      <slot name="prefix" />
    </template>
    <template slot="suffix">
      <slot name="suffix" />
    </template>
  </Button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    append: {
      default: false,
      type: Boolean,
    },
    ariaLabel: {
      required: true,
      type: String,
    },
    buttonClass: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    disabled: {
      default: false,
      type: Boolean,
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
  methods: {
    click() {
      ;(this.$refs.button as HTMLButtonElement).click()
    },
  },
})
</script>
