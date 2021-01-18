<template>
  <div :class="size" />
</template>

<script>
export default {
  props: {
    size: {
      default: 'm-2',
      type: String,
    },
  },
}
</script>
