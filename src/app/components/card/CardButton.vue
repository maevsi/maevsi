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
    <Card :class="classCard">
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
          <div v-else-if="props.to">
            <IMaevsiArrowForward alt="arrow forward" class="h-6 w-6" />
          </div>
        </div>
      </div>
    </Card>
  </Button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

export interface Props {
  classCard?: string
  description?: string
  isDisabled?: boolean
  isExternal?: boolean
  title: string
  to?: RouteLocationRaw
}
const props = withDefaults(defineProps<Props>(), {
  classCard: undefined,
  description: undefined,
  isDisabled: undefined,
  isExternal: undefined,
  to: undefined,
})
</script>
