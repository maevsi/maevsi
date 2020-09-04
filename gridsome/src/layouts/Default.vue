<template>
  <div class="container mx-auto p-4 text-center">
    <header class="flex items-center justify-between mb-4 relative">
      <g-link to="/">
        <g-image
          class="w-32"
          alt="maevsi logo"
          :src="imageSrc"
        />
      </g-link>
      <div class="dropdown text-lg">
        <g-link :to="'/account/' + (loggedInUsername === undefined ? '' : loggedInUsername)">
          <font-awesome
            class="mr-2"
            :icon="['fas', 'user']"
          />{{ loggedInUsername === undefined ? 'Account' : loggedInUsername }}
        </g-link>
        <div
          v-if="loggedInUsername !== undefined"
          class="absolute dropdown-content right-0"
        >
          <div class="mt-1">
            <g-link :to="'/account/' + (loggedInUsername === undefined ? '' : loggedInUsername) + '/settings'">
              <font-awesome
                class="mr-2"
                :icon="['fas', 'cog']"
              />Settings
            </g-link>
          </div>
          <div class="mt-1">
            <button @click="$logOut($apollo.provider)">
              <font-awesome
                class="mr-2"
                :icon="['fas', 'sign-out-alt']"
              />Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  data () {
    return {
      loggedInUsername: undefined,
      colorMode: require('~/assets/maevsi.svg')
    }
  },
  computed: {
    imageSrc () {
      if (this.colorMode === 'dark') {
        return require('~/assets/maevsi_with-text_white.svg')
      } else if (this.colorMode === 'light') {
        return require('~/assets/maevsi_with-text_black.svg')
      }

      return require('~/assets/maevsi.svg')
    }
  },
  created () {
    this.$jwtDecode((jwt, jwtDecoded) => {
      if (jwtDecoded.role === 'maevsi_account' && jwtDecoded.exp > Math.floor(new Date() / 1000)) {
        this.loggedInUsername = jwtDecoded.username
      }
    })

    if (typeof window !== 'undefined') {
      const mM = window.matchMedia('(prefers-color-scheme: dark)')
      mM.addEventListener('change', this.updateColorMode)
      this.updateColorMode(mM)
    }
  },
  methods: {
    updateColorMode (mM) {
      this.colorMode = mM.matches ? 'dark' : 'light'
    }
  }
}
</script>
