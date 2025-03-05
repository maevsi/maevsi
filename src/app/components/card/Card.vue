<template>
  <!-- TODO: hide or show overflow completely -->
  <div
    :class="
      cn(
        'bg-base-white dark:bg-background-darken text-base-text-primary border-faint-line overflow-x-hidden rounded-xl border p-2 shadow-xs dark:border-none',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HtmlHTMLAttributes } from 'vue'

import { cn } from '@/utils/shadcn'

const props = withDefaults(
  defineProps<{ class?: HtmlHTMLAttributes['class'] }>(),
  {
    class: undefined,
  },
)
</script>

<script lang="ts">
export default {
  name: 'MaevsiCard',
}
</script>
