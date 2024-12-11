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

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

export interface Props {
  ariaLabel: string
  disabled?: boolean
  to?: RouteLocationRaw
  type?: 'button' | 'reset' | 'submit'
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()
</script>
