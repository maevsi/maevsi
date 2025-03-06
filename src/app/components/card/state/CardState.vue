<template>
  <Card :class="cn('border-0 text-center font-medium text-white', props.class)">
    <slot />
  </Card>
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
