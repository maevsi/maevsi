<template>
  <button
    :aria-label="ariaLabel"
    class="w-full justify-center rounded-md px-4 py-2 font-medium transition-colors"
    :class="{
      'text-faint-mid cursor-not-allowed bg-faint-weak': disabled,
      'bg-accent-strong text-text-bright hover:bg-accent-mid dark:bg-accent-strong dark:text-text-dark':
        !disabled,
    }"
    :disabled="disabled"
    :type="type"
    @click="handleSubmit"
  >
    <slot name="prefix" />
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface Props {
  ariaLabel: string
  disabled?: boolean
  type?: 'button' | 'reset' | 'submit'
  handleSubmit: () => void
}
</script>
