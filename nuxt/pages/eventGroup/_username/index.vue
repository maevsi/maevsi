<template>
  <div />
</template>

<script>
export default {
  validate({ params }) {
    // Must be a number
    return /^[A-Za-z0-9-_]+$/.test(params.id)
  },
}
</script>
