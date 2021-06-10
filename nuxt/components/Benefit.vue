<template>
  <section
    class="
      flex flex-1 flex-basis-auto
      sm:flex-basis-33
      flex-col
      items-center
      p-8
    "
  >
    <LoaderImage :alt="title" class="h-8 w-8" :src="iconPath" />
    <h3 class="text-center">{{ title }}</h3>
    <p class="text-center">{{ description }}</p>
  </section>
</template>

<script>
export default {
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
}
</script>
