<template>
  <section class="relative flex-1 basis-1/2 p-8 xl:basis-auto">
    <div class="absolute left-1/2 z-0 -translate-x-1/2">
      <span class="text-8xl leading-snug font-extrabold opacity-10">
        {{ number }}
      </span>
    </div>
    <div class="z-20 mt-14 flex flex-col items-center">
      <h3 class="text-center">{{ title }}</h3>
      <p class="text-center"><slot /></p>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface Props {
  number: string
  title: string
}
withDefaults(defineProps<Props>(), {})
</script>

<script lang="ts">
export default {
  name: 'AppStep',
}
</script>
