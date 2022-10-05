<template>
  <div
    class="flex flex-1 flex-col items-start p-4 basis-1/2 md:flex-none md:basis-auto"
  >
    <span class="whitespace-nowrap text-lg font-medium leading-7">
      {{ heading }}
    </span>
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    heading: {
      required: true,
      type: String,
    },
  },
})
</script>
