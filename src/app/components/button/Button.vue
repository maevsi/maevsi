<template>
  <AppLink
    v-if="props.to"
    :aria-label="ariaLabel"
    :class="classes"
    :is-disabled="disabled"
    :is-colored="false"
    :to="props.to"
    @click="emit('click')"
  >
    <slot name="prefix" />
    <!-- <div class="truncate-overflow"> -->
    <slot />
    <!-- </div> -->
    <slot name="suffix" />
  </AppLink>
  <button
    v-else
    :aria-label="ariaLabel"
    :class="['rounded', classes]"
    :disabled="disabled"
    :type="type"
    @click="emit('click')"
  >
    <slot name="prefix" />
    <!-- <span class="truncate-overflow"> -->
    <slot />
    <!-- </span> -->
    <slot name="suffix" />
  </button>
</template>

<script
  setup
  lang="ts"
  generic="
    T extends RoutesNamesList,
    P extends string,
    E extends boolean = false
  "
>
import type { NuxtRoute, RoutesNamesList } from '@typed-router'

export interface Props<
  T extends RoutesNamesList,
  P extends string,
  E extends boolean = false,
> {
  ariaLabel: string
  disabled?: boolean
  isBlock?: boolean
  isExternal?: E
  isLinkColored?: boolean
  to?: NuxtRoute<T, P, E>
  type?: 'button' | 'submit' | 'reset'
}
const props = withDefaults(defineProps<Props<T, P, E>>(), {
  disabled: false,
  isBlock: false,
  isExternal: undefined,
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
