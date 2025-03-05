<template>
  <Card
    :class="cn('relative isolate flex items-center gap-3 p-2', props.class)"
  >
    <div class="flex items-center p-2">
      <slot />
    </div>
    <div class="flex flex-1 flex-col">
      <Button
        :aria-label="title"
        :disabled="isDisabled"
        :is-external="props.isExternal"
        is-external-icon-disabled
        :to="props.to"
      >
        <span class="absolute inset-0 z-10" />
        <span class="font-bold">
          {{ title }}
        </span>
      </Button>
      <span v-if="description" class="opacity-60">
        {{ description }}
      </span>
    </div>
    <div class="p-2">
      <slot v-if="$slots.iconSecondary" name="iconSecondary" />
      <div v-else-if="props.to">
        <IMaevsiArrowForward alt="arrow forward" class="h-6 w-6" />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { HtmlHTMLAttributes } from 'vue'

import { cn } from '@/utils/shadcn'

export interface Props {
  description?: string
  isDisabled?: boolean
  isExternal?: boolean
  title: string
  to?: RouteLocationRaw
}
const props = withDefaults(
  defineProps<Props & { class?: HtmlHTMLAttributes['class'] }>(),
  {
    class: undefined,
    description: undefined,
    isDisabled: undefined,
    isExternal: undefined,
    to: undefined,
  },
)
</script>
