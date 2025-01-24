<script lang="ts" setup>
import type { StepperTitleProps } from 'radix-vue'
import { cn } from '@/utils/shadcn'
import { StepperTitle, useForwardProps } from 'radix-vue'

import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  StepperTitleProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTitle
    v-bind="forwarded"
    :class="cn('text-md whitespace-nowrap font-semibold', props.class)"
  >
    <slot />
  </StepperTitle>
</template>
