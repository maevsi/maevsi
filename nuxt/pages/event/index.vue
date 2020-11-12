<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="flex flex-wrap justify-center my-2">
      <Button
        v-if="signedIn"
        :icon-id="['fas', 'plus']"
        :link="'/new'"
        class="m-2"
      >
        {{ $t('createEvent') }}
      </Button>
      <ButtonRedeem class="m-2" />
    </div>
    <EventList />
  </div>
</template>

<script>
export default {
  data() {
    return {
      graphqlErrorMessage: undefined,
      title: this.$t('title'),
    }
  },
  computed: {
    signedIn() {
      return (
        this.$store.state.jwtDecoded &&
        this.$store.state.jwtDecoded.role === 'maevsi_account' &&
        this.$store.state.jwtDecoded.exp > Math.floor(Date.now() / 1000)
      )
    },
  },
  head() {
    return { title: this.title }
  },
}
</script>

<i18n lang="yml">
de:
  createEvent: 'Veranstaltung erstellen'
  title: 'Veranstaltungen'
en:
  createEvent: 'Create event'
  title: 'Events'
</i18n>
