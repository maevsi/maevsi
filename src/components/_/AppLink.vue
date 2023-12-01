<template>
  <NuxtLink
    :aria-label="ariaLabel"
    :class="classes"
    :target="targetComputed"
    :to="to"
    @click="emit('click')"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

export interface Props {
  ariaLabel?: string
  isColored?: boolean
  isUnderlined?: boolean
  target?: NuxtLinkProps['target']
  to: NonNullable<NuxtLinkProps['to']>
}
const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  isColored: true,
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
