<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="flex flex-wrap justify-center my-2">
      <Button
        v-if="loggedIn"
        :icon-id="['fas', 'plus']"
        :link="'/new'"
        class="m-2"
      >
        Create event
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
      title: 'Events',
    }
  },
  computed: {
    loggedIn() {
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
