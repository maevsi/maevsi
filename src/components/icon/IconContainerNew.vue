<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script setup lang="ts">
export interface Props {
  classes?: string
}
const props = withDefaults(defineProps<Props>(), {
  classes: 'h-5 md:h-6 w-5 md:w-6 shrink-0',
})

// computations
const classes = computed(() => {
  return ['block', props.classes].join(' ')
})
</script>
