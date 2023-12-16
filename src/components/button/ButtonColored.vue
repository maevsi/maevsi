<template>
  <Button
    :aria-label="ariaLabel"
    class="justify-center rounded-md px-4 py-2 font-medium"
    :class="
      [
        ...(isPrimary
          ? [
              'bg-gradient-to-tr from-blue-500 to-blue-600 text-text-bright dark:from-blue-300 dark:to-blue-400 dark:text-text-dark',
            ]
          : [
              'border border-gray-300 text-text-dark hover:bg-black/5 dark:border-gray-600 dark:text-text-bright dark:hover:bg-black/30',
            ]),
      ].join(' ')
    "
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
  isExternal?: E
  isPrimary?: boolean
  to?: NuxtRoute<T, P, E>
  type?: 'button' | 'reset' | 'submit'
}
const props = withDefaults(defineProps<Props<T, P, E>>(), {
  disabled: false,
  isExternal: undefined,
  isPrimary: true,
  to: undefined,
  type: 'button',
})

const emit = defineEmits<{
  click: []
}>()
</script>
