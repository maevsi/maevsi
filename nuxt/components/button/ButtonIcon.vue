<template>
  <Button
    :aria-label="ariaLabel"
    class="justify-center"
    :disabled="disabled || isLoading"
    :title="ariaLabel"
    :to="to"
    :type="type"
    @click="emit('click')"
  >
    <div class="relative">
      <slot />
      <LoaderIndicatorSpinner v-if="isLoading" class="absolute inset-0" />
    </div>
  </Button>
</template>

<script setup lang="ts">
export interface Props {
  ariaLabel: string
  disabled?: boolean
  isLoading?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
}
withDefaults(defineProps<Props>(), {
  disabled: false,
  isLoading: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
