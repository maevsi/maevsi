<template>
  <section
    class="flex flex-1 flex-basis-auto sm:flex-basis-33 flex-col items-center px-4 sm:px-8 py-8 w-full"
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

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MaevsiBenefit',
  props: {
    description: {
      required: true,
      type: String,
    },
    iconPath: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },
})
</script>
