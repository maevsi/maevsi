<template>
  <section
    class="flex w-full flex-1 basis-auto flex-col items-center px-4 py-8 sm:basis-1/3 sm:px-8"
  >
    <LoaderImage
      :alt="title"
      aspect="aspect-square"
      class="h-8 w-8"
      height="32"
      :src="iconPath"
      width="32"
    />
    <h3 class="text-center">{{ title }}</h3>
    <p class="text-center">{{ description }}</p>
  </section>
</template>

<script setup lang="ts">
export interface Props {
  description: string
  iconPath: string
  title: string
}
withDefaults(defineProps<Props>(), {})
</script>

<script lang="ts">
export default {
  name: 'AppBenefit',
}
</script>
