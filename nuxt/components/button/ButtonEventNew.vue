<template>
  <Button v-if="signedIn" :icon-id="['fas', 'plus']" :to="localePath('/new')">
    {{ $t('new') }}
  </Button>
</template>

<script>
export default {
  computed: {
    signedIn() {
      return (
        this.$store.state.jwtDecoded &&
        this.$store.state.jwtDecoded.role === 'maevsi_account' &&
        this.$store.state.jwtDecoded.exp > Math.floor(Date.now() / 1000)
      )
    },
  },
}
</script>

<i18n lang="yml">
de:
  new: 'Veranstaltung erstellen'
en:
  new: 'Create event'
</i18n>
