<template>
  <div
    class="flex flex-1 md:flex-none flex-basis-50 md:flex-basis-auto flex-col items-start p-4"
  >
    <span class="font-medium leading-7 text-lg whitespace-nowrap">
      {{ heading }}
    </span>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  props: {
    heading: {
      required: true,
      type: String,
    },
  },
})
</script>
