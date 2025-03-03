<template>
  <Button
    :aria-label="title"
    class="rounded-lg text-left"
    is-block
    :disabled="isDisabled"
    :is-external="props.isExternal"
    is-external-icon-disabled
    :to="props.to"
  >
    <Card :background-color="backgroundColor" :border-color="borderColor">
      <div class="flex items-center gap-4">
        <div class="flex items-center px-2">
          <slot />
        </div>
        <div class="flex flex-1 flex-col">
          <span class="font-bold">
            {{ title }}
          </span>
          <span v-if="description" class="opacity-60">
            {{ description }}
          </span>
        </div>
        <div class="opacity-60">
          <slot v-if="$slots.iconSecondary" name="iconSecondary" />
          <IMaevsiArrowForward v-else alt="arrow forward" class="h-4 w-4" />
        </div>
      </div>
    </Card>
  </Button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

export interface Props {
  backgroundColor?: string
  borderColor?: string
  description?: string
  isDisabled?: boolean
  isExternal?: boolean
  title: string
  to?: RouteLocationRaw
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: undefined,
  borderColor: undefined,
  description: undefined,
  isDisabled: undefined,
  isExternal: undefined,
  to: undefined,
})
</script>
