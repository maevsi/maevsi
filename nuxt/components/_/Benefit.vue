<template>
  <section
    class="flex w-full flex-1 flex-col items-center px-4 py-8 basis-auto sm:px-8 sm:basis-1/3"
  >
    <LoaderImage
      :alt="title"
      class="h-8 w-8"
      height="32"
      :src="iconPath"
      width="32"
    />
    <div class="w-full">
      <!-- Heading wrapper required for text overflow ellipsis. -->
      <h3 class="text-center">{{ title }}</h3>
    </div>
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
  name: 'MaevsiBenefit',
}
</script>
