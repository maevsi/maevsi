<template>
  <Button
    :aria-label="ariaLabel"
    class="whitespace-nowrap px-4 py-2 font-medium"
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

<script setup lang="ts" generic="T extends RoutesNamesList, P extends string">
import type { NuxtRoute, RoutesNamesList } from '@typed-router'

export interface Props<T extends RoutesNamesList, P extends string> {
  ariaLabel: string
  disabled?: boolean
  to?: NuxtRoute<T, P>
  type?: 'button' | 'reset' | 'submit'
}
const props = withDefaults(defineProps<Props<T, P>>(), {
  disabled: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()
</script>
