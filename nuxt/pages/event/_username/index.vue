<template>
  <EventList :username="$route.params.username" />
</template>

<script>
export default {
  validate({ app, params }) {
    return app.$global.REGEX_SLUG.test(params.username)
  },
}
</script>
