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

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

export interface Props {
  ariaLabel: string
  disabled?: boolean
  to?: RouteLocationRaw
  type?: 'button' | 'submit' | 'reset'
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
