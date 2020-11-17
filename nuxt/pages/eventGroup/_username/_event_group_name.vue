<template>
  <div>
    <h1>{{ $route.params.event_group_name }}</h1>
    <p>{{ $t('futureEventGroups') }}</p>
  </div>
</template>

<script>
export default {
  head() {
    return { title: this.$route.params.event_group_name }
  },
  validate({ app, params }) {
    app.$global.REGEX_SLUG.test(params.username)
  },
}
</script>

<i18n lang="yml">
de:
  futureEventGroups: 'Es ist noch nicht möglich Veranstaltungsgruppen anzuzeigen. Ohren steifhalten!'
en:
  futureEventGroups: "It's not yet possible to view event groups. Stay tuned!"
</i18n>
