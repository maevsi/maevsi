<template>
  <div class="container mx-auto p-4 text-center">
    <header class="flex items-center justify-between mb-4 relative">
      <nuxt-link to="/">
        <div id="logo" class="h-10 w-32" />
      </nuxt-link>
      <div class="dropdown text-lg">
        <nuxt-link
          :to="
            '/account/' +
            (loggedInUsername === undefined ? '' : loggedInUsername)
          "
        >
          <FontAwesomeIcon class="mr-2" :icon="['fas', 'user']" />{{
            loggedInUsername === undefined ? 'Account' : loggedInUsername
          }}
        </nuxt-link>
        <div
          v-if="loggedInUsername !== undefined"
          class="absolute dropdown-content right-0"
        >
          <div class="mt-1">
            <nuxt-link
              :to="
                '/account/' +
                (loggedInUsername === undefined ? '' : loggedInUsername) +
                '/settings'
              "
            >
              <FontAwesomeIcon class="mr-2" :icon="['fas', 'cog']" />Settings
            </nuxt-link>
          </div>
          <div class="mt-1">
            <button
              @click="$global.logOut($apollo.getClient(), $store, undefined)"
            >
              <FontAwesomeIcon
                class="mr-2"
                :icon="['fas', 'sign-out-alt']"
              />Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    loggedInUsername() {
      return this.$store.state.jwtDecoded &&
        this.$store.state.jwtDecoded.role === 'maevsi_account' &&
        this.$store.state.jwtDecoded.exp > Math.floor(Date.now() / 1000)
        ? this.$store.state.jwtDecoded.username
        : undefined
    },
  },
}
</script>

<style scoped>
#logo {
  background-image: url(/assets/static/logos/maevsi.svg);
  background-repeat: no-repeat;
  background-size: contain;
}
@media (prefers-color-scheme: dark) {
  #logo {
    background-image: url(/assets/static/logos/maevsi_with-text_white.svg);
  }
}
@media (prefers-color-scheme: light) {
  #logo {
    background-image: url(/assets/static/logos/maevsi_with-text_black.svg);
  }
}
</style>
