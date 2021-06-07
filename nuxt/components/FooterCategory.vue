<template>
  <div class="flex flex-col">
    <span class="font-medium leading-7 text-lg">
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
