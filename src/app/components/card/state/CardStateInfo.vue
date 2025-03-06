<template>
  <CardState :class="cn('bg-blue-600', props.class)">
    <slot />
  </CardState>
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
