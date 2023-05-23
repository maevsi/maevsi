<template>
  <div
    class="flex flex-1 flex-col items-start p-4 basis-1/2 gap-2 max-w-full md:flex-none md:basis-auto"
  >
    <span class="truncate-overflow max-w-full text-lg font-medium leading-7">
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
