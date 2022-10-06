<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="classes"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</template>

<script setup lang="ts">
export interface Props {
  classes?: string
}
withDefaults(defineProps<Props>(), {
  classes: 'h-5 md:h-6 w-5 md:w-6 shrink-0',
})
</script>
