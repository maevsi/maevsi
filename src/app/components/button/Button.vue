<template>
  <AppLink
    v-if="props.to"
    v-bind="delegatedProps"
    :aria-label="ariaLabel"
    :class="cn(classes, props.class)"
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
    :class="cn(['rounded-sm', classes], props.class)"
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

<script setup lang="ts">
import { cn } from '@/utils/shadcn'
import type { HtmlHTMLAttributes } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export interface Props {
  ariaLabel: string
  disabled?: boolean
  isBlock?: boolean
  isExternal?: boolean
  isLinkColored?: boolean
  to?: RouteLocationRaw
  type?: 'button' | 'submit' | 'reset'
}
const props = withDefaults(
  defineProps<Props & { class?: HtmlHTMLAttributes['class'] }>(),
  {
    disabled: false,
    class: undefined,
    isBlock: false,
    isExternal: undefined,
    isLinkColored: false,
    to: undefined,
    type: 'button',
  },
)
const delegatedProps = computed(() => {
  const {
    class: _class,
    disabled: _disabled,
    isBlock: _isBlock,
    isLinkColored: _isLinkColored,
    type: _type,
    to: _to,
    ...delegated
  } = props

  return delegated
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
  name: 'AppButton',
}
</script>
