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
            <button @click="logout">
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
  data() {
    return {
      loggedInUsername: undefined,
    }
  },
  mounted() {
    // Must not be anything before 'mounted' as rendering would collide with 'v-if="loggedInUsername !== undefined"'.
    this.$global.jwtDecode(this, (_jwt, jwtDecoded) => {
      if (
        jwtDecoded.role === 'maevsi_account' &&
        jwtDecoded.exp > Math.floor(new Date() / 1000)
      ) {
        this.loggedInUsername = jwtDecoded.username
      }
    })
  },
  methods: {
    logout() {
      this.$global.logOut(this)
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
