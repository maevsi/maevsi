<template>
  <NuxtLink
    :aria-label="ariaLabel"
    :class="cn(classes, props.class)"
    :disabled="isDisabled"
    :external="isExternal"
    :target="targetComputed"
    :to="props.to"
    @click="emit('click')"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { HtmlHTMLAttributes } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import type { NuxtLinkProps } from '#app'
import { cn } from '@/utils/shadcn'

export interface Props {
  ariaLabel?: string
  isDisabled?: boolean
  isColored?: boolean
  isExternal?: boolean
  isUnderlined?: boolean
  target?: NuxtLinkProps['target']
  to: RouteLocationRaw
}
const props = withDefaults(
  defineProps<Props & { class?: HtmlHTMLAttributes['class'] }>(),
  {
    ariaLabel: undefined,
    class: undefined,
    isDisabled: undefined,
    isColored: true,
    isExternal: undefined,
    isUnderlined: false,
    target: undefined,
  },
)

const emit = defineEmits<{
  click: []
}>()

// computations
const classes = computed(() => {
  return [
    'rounded-sm',
    ...(props.isColored ? ['text-link-dark dark:text-link-bright'] : []),
    ...(props.isDisabled ? ['disabled'] : []),
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
