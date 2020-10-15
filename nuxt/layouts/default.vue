<template>
  <div class="container mx-auto p-4 text-center">
    <header class="flex items-center justify-between mb-4 relative">
      <nuxt-link to="/">
        <img class="w-32" alt="maevsi logo" :src="imageSrc" />
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
            <button @click="$global.logOut()">
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
      colorMode: require('~/assets/maevsi.svg'),
    }
  },
  computed: {
    imageSrc() {
      if (this.colorMode === 'dark') {
        return require('~/assets/maevsi_with-text_white.svg')
      } else if (this.colorMode === 'light') {
        return require('~/assets/maevsi_with-text_black.svg')
      }

      return require('~/assets/maevsi.svg')
    },
  },
  mounted() {
    if (typeof window !== 'undefined') {
      const mM = window.matchMedia('(prefers-color-scheme: dark)')
      mM.addEventListener('change', this.updateColorMode)
      this.updateColorMode(mM)
    }

    // Must not be anything before 'mounted' as rendering would collide with 'v-if="loggedInUsername !== undefined"'.
    this.$global.jwtDecode((_jwt, jwtDecoded) => {
      if (
        jwtDecoded.role === 'maevsi_account' &&
        jwtDecoded.exp > Math.floor(new Date() / 1000)
      ) {
        this.loggedInUsername = jwtDecoded.username
      }
    })
  },
  methods: {
    updateColorMode(mM) {
      this.colorMode = mM.matches ? 'dark' : 'light'
    },
  },
}
</script>
