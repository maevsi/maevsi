<template>
  <AppLink
    v-if="to"
    :aria-label="ariaLabel"
    :class="classes"
    :disabled="disabled"
    :is-colored="false"
    :is-to-relative="isToRelative"
    :to="to"
    @click="emit('click')"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </AppLink>
  <button
    v-else
    :aria-label="ariaLabel"
    :class="classes"
    :disabled="disabled"
    :type="type"
    @click="emit('click')"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </button>
</template>

<script setup lang="ts">
export interface Props {
  ariaLabel: string
  disabled?: boolean
  isBlock?: boolean
  isLinkColored?: boolean
  isToRelative?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isBlock: false,
  isLinkColored: false,
  isToRelative: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

// computations
const classes = computed(() => {
  return [
    ...(props.isBlock ? ['block'] : ['inline-flex items-center gap-2']),
    ...(props.isLinkColored ? ['text-link-dark dark:text-link-bright'] : []),
  ].join(' ')
})
</script>

<script lang="ts">
export default {
  name: 'MaevsiButton',
}
</script>
