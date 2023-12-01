<template>
  <NuxtLink
    :aria-label="ariaLabel"
    :class="classes"
    :target="targetComputed"
    :to="props.to"
    @click="emit('click')"
  >
    <slot />
  </NuxtLink>
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
import type { NuxtLinkProps } from '#app'
import type { NuxtRoute } from '@typed-router/__router'
import type { RoutesNamesList } from '@typed-router/__routes'

export interface Props<
  T extends RoutesNamesList,
  P extends string,
  E extends boolean = false,
> {
  ariaLabel?: string
  isColored?: boolean
  isExternal?: E
  isUnderlined?: boolean
  target?: NuxtLinkProps['target']
  to: NuxtRoute<T, P, E>
}
const props = withDefaults(defineProps<Props<T, P, E>>(), {
  ariaLabel: undefined,
  isColored: true,
  isExternal: undefined,
  isUnderlined: false,
  target: undefined,
})

const emit = defineEmits<{
  click: []
}>()

// computations
const classes = computed(() => {
  return [
    'rounded',
    ...(props.isColored ? ['text-link-dark dark:text-link-bright'] : []),
    ...(props.isUnderlined ? ['underline'] : []),
  ].join(' ')
})
const targetComputed = computed(
  () =>
    props.target ||
    (props.to.toString().match(/^((ftp|http(s)?):\/\/|(mailto):)/)
      ? '_blank'
      : undefined),
)
</script>
