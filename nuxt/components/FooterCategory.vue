<template>
  <div
    class="
      flex flex-1
      md:flex-none
      flex-basis-50
      md:flex-basis-auto
      flex-col
      items-start
      p-4
    "
  >
    <span class="font-medium leading-7 text-lg whitespace-nowrap">
      {{ heading }}
    </span>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      required: true,
      type: String,
    },
  },
}
</script>
