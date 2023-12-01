<template>
  <AppLink
    v-if="to"
    :aria-label="ariaLabel"
    :class="classes"
    :disabled="disabled"
    :is-colored="false"
    :to="to"
    @click="emit('click')"
  >
    <slot name="prefix" />
    <div class="truncate-overflow">
      <slot />
    </div>
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
    <span class="truncate-overflow">
      <slot />
    </span>
    <slot name="suffix" />
  </button>
</template>

<script setup lang="ts">
export interface Props {
  ariaLabel: string
  disabled?: boolean
  isBlock?: boolean
  isLinkColored?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isBlock: false,
  isLinkColored: false,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()

// computations
const classes = computed(() => {
  return [
    'overflow-hidden',
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
