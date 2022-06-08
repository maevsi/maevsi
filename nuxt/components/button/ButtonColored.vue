<template>
  <div class="text-center">
    <div
      class="rounded-md border"
      :class="
        [
          ...(isPrimary
            ? [
                'border-transparent bg-gray-800 text-text-bright hover:bg-black dark:bg-gray-100 dark:text-text-dark dark:hover:bg-gray-200',
              ]
            : [
                'border-gray-300 bg-background-bright text-text-dark hover:bg-gray-200 dark:border-gray-600 dark:bg-background-dark dark:text-text-bright dark:hover:bg-black',
              ]),
          ...(isBlock ? ['block'] : ['inline-block']),
          ...(buttonClass ? [buttonClass] : []),
        ].join(' ')
      "
    >
      <Button
        ref="button"
        :append="append"
        :aria-label="ariaLabel"
        class="justify-center px-4 py-2 font-medium"
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
    </div>
  </div>
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
    isBlock: {
      default: false,
      type: Boolean,
    },
    isPrimary: {
      default: true,
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
