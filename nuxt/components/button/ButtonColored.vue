<template>
  <div class="text-center">
    <Button
      ref="button"
      :append="append"
      :aria-label="ariaLabel"
      :button-class="
        [
          'font-bold my-auto py-2 px-4 rounded-md shadow text-center text-text-bright text-xl',
          ...(secondary
            ? ['bg-green-600 hover:bg-green-700']
            : ['bg-red-600 hover:bg-red-700 ']),
          ...(buttonClass ? [buttonClass] : []),
        ].join(' ')
      "
      :disabled="disabled"
      :icon-id="iconId"
      :to="to"
      :type="type"
      @click="$emit('click')"
    >
      <slot />
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

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
    iconId: {
      default: undefined,
      type: Array as PropType<string[] | undefined>,
    },
    secondary: {
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
