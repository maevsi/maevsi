<template>
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="paragraph"
    :class="classes"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M448 63.1C448 81.67 433.7 96 416 96H384v352c0 17.67-14.33 32-31.1 32S320 465.7 320 448V96h-32v352c0 17.67-14.33 32-31.1 32S224 465.7 224 448v-96H198.9c-83.57 0-158.2-61.11-166.1-144.3C23.66 112.3 98.44 32 191.1 32h224C433.7 32 448 46.33 448 63.1z"
    />
  </svg>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    classes: {
      default: 'h-5 md:h-6 w-5 md:w-6 shrink-0',
      type: String,
    },
  },
})
</script>
