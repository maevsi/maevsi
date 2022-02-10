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
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  props: {
    classes: {
      default: 'h-5 md:h-6 w-5 md:w-6',
      type: String,
    },
  },
})
</script>
