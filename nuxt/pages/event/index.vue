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
      loggedIn: undefined,
      title: 'Events',
    }
  },
  mounted() {
    // Must not be anything before 'mounted' as rendering would collide with 'v-if="loggedIn"'.
    this.$global.jwtDecode((_jwt, jwtDecoded) => {
      if (
        jwtDecoded.role === 'maevsi_account' &&
        jwtDecoded.exp > Math.floor(new Date() / 1000)
      ) {
        this.loggedIn = true
      }
    })
  },
  head() {
    return { title: this.title }
  },
}
</script>
