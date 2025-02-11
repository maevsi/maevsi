<template>
  <Button
    :aria-label="ariaLabel"
    class="justify-center rounded-md px-4 py-2 font-medium"
    :class="
      [
        ...(isPrimary
          ? [
              'text-text-bright dark:text-text-dark bg-gradient-to-tr from-blue-500 to-blue-600 dark:from-blue-300 dark:to-blue-400',
            ]
          : [
              'text-text-dark dark:text-text-bright border border-gray-300 hover:bg-black/5 dark:border-gray-600 dark:hover:bg-black/30',
            ]),
      ].join(' ')
    "
    :disabled="disabled"
    :to="props.to"
    :type="type"
    @click="emit('click')"
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

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

export interface Props {
  ariaLabel: string
  disabled?: boolean
  isExternal?: boolean
  isPrimary?: boolean
  to?: RouteLocationRaw
  type?: 'button' | 'reset' | 'submit'
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isExternal: undefined,
  isPrimary: true,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()
</script>
