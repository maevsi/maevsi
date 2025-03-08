<template>
  <Button
    :aria-label="ariaLabel"
    class="justify-center rounded-md px-4 py-2 font-medium"
    :class="variantClasses"
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
  variant?: 'primary' | 'secondary'
  to?: RouteLocationRaw
  type?: 'button' | 'reset' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isExternal: undefined,
  variant: 'primary',
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-(--accent-strong) font-bold text-(--semantic-base-primary-button-text) hover:bg-(--accent-strong-hover)'
    case 'secondary':
      return 'bg-(--accent-weak) font-bold text-(--semantic-base-secondary-button-text) hover:bg-(--accent-weak-hover)'
    default:
      return 'bg-(--accent-strong) text-(--semantic-base-primary-button-text) hover:bg-(--accent-strong-hover)'
  }
})
</script>
