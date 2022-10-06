<template>
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="heading"
    :class="classes"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M448 448c0 17.69-14.33 32-32 32h-96c-17.67 0-32-14.31-32-32s14.33-32 32-32h16v-144h-224v144H128c17.67 0 32 14.31 32 32s-14.33 32-32 32H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h16v-320H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32H112v112h224v-112H320c-17.67 0-32-14.31-32-32s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32h-16v320H416C433.7 416 448 430.3 448 448z"
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
