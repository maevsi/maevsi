<template>
  <section class="flex-1 flex-basis-50 xl:flex-basis-auto p-8 relative">
    <div class="absolute left-1/2 transform -translate-x-1/2 z-0">
      <span class="font-extrabold leading-snug opacity-10 text-7xl">
        {{ number }}
      </span>
    </div>
    <div
      class="
        flex flex-1 flex-basis-auto
        sm:flex-basis-33
        flex-col
        items-center
        mt-8
        z-20
      "
    >
      <h3 class="text-center">{{ title }}</h3>
      <p class="text-center">{{ description }}</p>
    </div>
  </section>
</template>

<script>
export default {
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
}
</script>
