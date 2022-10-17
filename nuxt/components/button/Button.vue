<template>
  <AppLink
    v-if="to"
    ref="buttonRef"
    :append="append"
    :aria-label="ariaLabel"
    :class="classes"
    :disabled="disabled"
    :is-colored="false"
    :to="to"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </AppLink>
  <button
    v-else
    ref="buttonRef"
    :aria-label="ariaLabel"
    :class="classes"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </button>
</template>

<script setup lang="ts">
export interface Props {
  append?: boolean
  ariaLabel: string
  disabled?: boolean
  isBlock?: boolean
  isLinkColored?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
}
const props = withDefaults(defineProps<Props>(), {
  append: false,
  disabled: false,
  isBlock: false,
  isLinkColored: false,
  to: undefined,
  type: 'button',
})

// refs
const buttonRef = ref<HTMLButtonElement>()

// // methods
// function click() {
//   buttonRef.value?.click()
// }

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
