<template>
  <div class="text-center">
    <div
      class="border font-medium px-4 py-2 rounded-md"
      :class="
        [
          ...(isPrimary
            ? [
                'bg-gray-800 hover:bg-black dark:bg-gray-100 dark:hover:bg-gray-200 border-transparent text-text-bright dark:text-text-dark',
              ]
            : [
                'bg-background-bright hover:bg-gray-200 dark:bg-background-dark dark:hover:bg-black border-gray-300 dark:border-gray-600 text-text-dark dark:text-text-bright',
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
        :disabled="disabled"
        :icon-id="iconId"
        :to="to"
        :type="type"
        @click="$emit('click')"
      >
        <slot />
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
    iconId: {
      default: undefined,
      type: Array as PropType<string[] | undefined>,
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
