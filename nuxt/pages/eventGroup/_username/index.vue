<template>
  <div />
</template>

<script>
export default {
  validate({ app, params }) {
    app.$global.REGEX_SLUG.test(params.username)
  },
}
</script>
