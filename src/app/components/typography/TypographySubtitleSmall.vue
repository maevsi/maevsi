<template>
  <div :class="cn('text-sm font-semibold', props.class)">
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
