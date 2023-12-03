<template>
  <Button
    :aria-label="ariaLabel"
    class="justify-center"
    :disabled="disabled"
    :title="ariaLabel"
    :to="props.to"
    :type="type"
    @click="emit('click')"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts" generic="T extends RoutesNamesList, P extends string">
import type { NuxtRoute, RoutesNamesList } from '@typed-router'

export interface Props<T extends RoutesNamesList, P extends string> {
  ariaLabel: string
  disabled?: boolean
  to?: NuxtRoute<T, P>
  type?: 'button' | 'submit' | 'reset'
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
