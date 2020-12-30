<template>
  <div :class="`m-${size}`" />
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 2,
    },
  },
}
</script>
