<template>
  <div class="flex flex-col px-4">
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
