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
    <Card :background-color="backgroundColor">
      <div class="flex items-center gap-4">
        <div class="flex items-center px-2">
          <slot />
        </div>
        <div class="flex flex-1 flex-col">
          <span :class="['font-bold', textWhite ? 'text-white' : 'text-black']">
            {{ title }}
          </span>
          <span v-if="description" class="opacity-60">
            {{ description }}
          </span>
        </div>
        <div class="opacity-60">
          <slot v-if="$slots.iconSecondary" name="iconSecondary" />
          <div v-else-if="!$slots.iconSecondary">
            <NuxtImg
              v-if="secondaryIcon === 'img' && src !== 'none'"
              :src="src"
              :alt="alt || 'Icon'"
              class="h-5 w-5"
            />

            <NuxtImg
              v-else-if="src !== 'none'"
              src="/assets/static/icons/arrow_forward.svg"
              alt="arrow forward"
              class="h-4 w-4"
            />
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
  textWhite?: boolean
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
  textWhite: false,
})
</script>
