<template>
  <Card :class="cn('relative isolate', props.class)">
    <div class="flex items-center gap-4">
      <div class="flex items-center px-2">
        <slot />
      </div>
      <div class="flex flex-1 flex-col">
        <Button
          :aria-label="title"
          class="font-bold"
          :disabled="isDisabled"
          :is-external="props.isExternal"
          is-external-icon-disabled
          :to="props.to"
        >
          <span class="absolute inset-0 z-10" />
          {{ title }}
        </Button>
        <span v-if="description" class="opacity-60">
          {{ description }}
        </span>
      </div>
      <div class="opacity-60">
        <slot v-if="$slots.iconSecondary" name="iconSecondary" />
        <div v-else-if="props.to">
          <IMaevsiArrowForward alt="arrow forward" class="h-6 w-6" />
        </div>
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
