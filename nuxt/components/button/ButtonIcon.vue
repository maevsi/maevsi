<template>
  <Button
    :aria-label="ariaLabel"
    class="flex justify-center"
    :disabled="disabled"
    :title="ariaLabel"
    :to="to"
    :type="type"
    @click="emit('click')"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts">
export interface Props {
  ariaLabel: string
  disabled?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
}
withDefaults(defineProps<Props>(), {
  disabled: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
