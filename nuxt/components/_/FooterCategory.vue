<template>
  <div
    class="flex flex-1 flex-col items-start p-4 flex-basis-50 md:flex-none md:flex-basis-auto"
  >
    <span class="whitespace-nowrap text-lg font-medium leading-7">
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
