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
    <Card :backgroundColor="backgroundColor">
      <div class="flex items-center gap-4">
        <div class="flex items-center px-2">
          <slot />
        </div>
        <div class="flex flex-1 flex-col">
          <span class="font-bold">{{ title }}</span>
          <span v-if="description" class="opacity-60">
            {{ description }}
          </span>
        </div>
        <div class="opacity-60">
          <slot v-if="$slots.iconS" name="iconS" />
          <div v-else-if="props.to">
            <img
              v-if="secondaryIcon === 'img' && src"
              :src="src"
              :alt="alt || 'Icon'"
              class="h-5 w-5"
            />

            <IHeroiconsChevronRight v-else class="h-5 w-5" />
          </div>
        </div>
      </div>
    </Card>
  </Button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { Component } from 'vue'

export interface Props {
  description?: string
  isDisabled?: boolean
  isExternal?: boolean
  title: string
  to?: RouteLocationRaw
  backgroundColor?: string
  secondaryIcon?: string | Component
  src?: string
  alt?: string
  heroIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  isDisabled: undefined,
  isExternal: undefined,
  to: undefined,
  backgroundColor: undefined,
  secondaryIcon: undefined,
  src: undefined,
  alt: undefined,
  heroIcon: undefined,
})
</script>
