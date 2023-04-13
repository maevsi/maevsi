<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="classes" aria-hidden="true">
    <slot />
  </svg>
</template>

<script setup lang="ts">
export interface Props {
  classes?: string
  title?: string // TODO: remove if aria-hidden="true" usage is valid
}
withDefaults(defineProps<Props>(), {
  classes: 'h-5 md:h-6 w-5 md:w-6 shrink-0',
  title: undefined,
})
</script>
