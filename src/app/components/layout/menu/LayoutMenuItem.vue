<template>
  <AppLink
    active-class="bg-blue-600 dark:bg-blue-400 text-text-bright dark:text-text-dark"
    class="min-w-0 basis-full rounded-xl"
    :is-colored="false"
    :to="props.to"
  >
    <div class="mx-4 my-2 flex flex-col items-center lg:flex-row lg:gap-2">
      <div>
        <slot />
      </div>
      <span class="hidden text-xs whitespace-nowrap sm:block lg:text-lg">
        {{ title }}
      </span>
    </div>
  </AppLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

export interface Props {
  title: string
  to: RouteLocationRaw
}
const props = withDefaults(defineProps<Props>(), {})
</script>
