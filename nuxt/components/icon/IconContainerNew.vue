<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script setup lang="ts">
export interface Props {
  classes?: string
}
withDefaults(defineProps<Props>(), {
  classes: 'h-5 md:h-6 w-5 md:w-6 shrink-0 block',
})
</script>
