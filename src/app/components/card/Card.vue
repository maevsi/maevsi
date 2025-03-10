<template>
  <!-- TODO: hide or show overflow completely -->
  <div
    :class="
      cn(
        'overflow-x-hidden rounded-xl border border-(--faint-line) bg-(--surface) p-2 shadow-xs',
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
  name: 'AppCard',
}
</script>
