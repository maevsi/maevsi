<template>
  <!-- TODO: hide or show overflow completely -->
  <div
    v-bind="delegatedProps"
    :class="
      cn(
        'bg-base-white dark:bg-background-darken border-faint-line overflow-x-hidden rounded-xl border p-4 shadow-xs',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils/shadcn'
import type { HtmlHTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{ class?: HtmlHTMLAttributes['class'] }>(),
  {
    class: undefined,
  },
)
const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props

  return delegated
})
</script>

<script lang="ts">
export default {
  name: 'MaevsiCard',
}
</script>
