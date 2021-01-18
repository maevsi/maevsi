<template>
  <div :class="`m-${size}`" />
</template>

<script>
export default {
  props: {
    size: {
      default: 2,
      type: [Number, String],
    },
  },
}
</script>
