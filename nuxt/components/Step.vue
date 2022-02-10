<template>
  <section class="relative flex-1 p-8 flex-basis-50 xl:flex-basis-auto">
    <div class="absolute left-1/2 z-0 -translate-x-1/2">
      <span class="text-7xl font-extrabold leading-snug opacity-10">
        {{ number }}
      </span>
    </div>
    <div
      class="z-20 mt-8 flex flex-1 flex-col items-center flex-basis-auto sm:flex-basis-33"
    >
      <h3 class="text-center">{{ title }}</h3>
      <p class="text-center">{{ description }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  name: 'MaevsiStep',
  props: {
    description: {
      required: true,
      type: String,
    },
    number: {
      required: true,
      type: String, // Cannot be Number as translations are always of type String.
    },
    title: {
      required: true,
      type: String,
    },
  },
})
</script>
