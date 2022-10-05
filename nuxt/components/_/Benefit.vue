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

<script lang="ts">
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
