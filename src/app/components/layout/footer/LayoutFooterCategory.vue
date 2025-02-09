<template>
  <div
    class="flex max-w-full flex-1 basis-1/2 flex-col items-start gap-2 p-4 md:flex-none md:basis-auto"
  >
    <span class="truncate-overflow max-w-full text-lg leading-7 font-medium">
      {{ heading }}
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  heading: string
}
withDefaults(defineProps<Props>(), {})
</script>
