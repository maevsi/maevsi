<template>
  <Button
    :aria-label="ariaLabel"
    class="justify-center rounded-md px-4 py-2 font-medium"
    :class="
      variant === 'primary'
        ? 'bg-accent-fancy from-blue-500 to-blue-600 text-text-bright hover:bg-accent-strong dark:from-blue-300 dark:to-blue-400 dark:text-text-dark'
        : 'bg-accent-weak text-accent-strong hover:bg-accent-mid dark:border dark:border-gray-600 dark:bg-inherit dark:text-text-bright dark:hover:bg-black/30'
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
  variant?: 'primary' | 'accent'
  to?: RouteLocationRaw
  type?: 'button' | 'reset' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isExternal: undefined,
  variant: 'primary', // default variant
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()
</script>
