<template>
  <Button
    ref="buttonRef"
    :append="append"
    :aria-label="ariaLabel"
    class="rounded-md border justify-center px-4 py-2 font-medium"
    :class="
      [
        ...(isPrimary
          ? [
              'border-transparent bg-gray-800 text-text-bright hover:bg-black dark:bg-gray-100 dark:text-text-dark dark:hover:bg-gray-200',
            ]
          : [
              'border-gray-300 text-text-dark hover:bg-black/5 dark:border-gray-600 dark:text-text-bright dark:hover:bg-black/30',
            ]),
      ].join(' ')
    "
    :disabled="disabled"
    :to="to"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #suffix>
      <slot name="suffix" />
    </template>
  </Button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

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
    disabled: {
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
      type: String as PropType<'button' | 'reset' | 'submit' | undefined>,
    },
  },
  setup() {
    const refs = {
      buttonRef: ref<HTMLButtonElement>(),
    }
    const methods = {
      click() {
        refs.buttonRef.value?.click()
      },
    }

    return {
      ...refs,
      ...methods,
    }
  },
})
</script>
