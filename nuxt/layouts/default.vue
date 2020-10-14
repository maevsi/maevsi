<template>
  <div class="container mx-auto p-4 text-center">
    <header class="flex items-center justify-between mb-4 relative">
      <g-link to="/">
        <g-image class="w-32" alt="maevsi logo" :src="imageSrc" />
      </g-link>
      <div class="dropdown text-lg">
        <g-link
          :to="
            '/account/' +
            (loggedInUsername === undefined ? '' : loggedInUsername)
          "
        >
          <FontAwesomeIcon class="mr-2" :icon="['fas', 'user']" />{{
            loggedInUsername === undefined ? 'Account' : loggedInUsername
          }}
        </g-link>
        <div
          v-if="loggedInUsername !== undefined"
          class="absolute dropdown-content right-0"
        >
          <div class="mt-1">
            <g-link
              :to="
                '/account/' +
                (loggedInUsername === undefined ? '' : loggedInUsername) +
                '/settings'
              "
            >
              <FontAwesomeIcon class="mr-2" :icon="['fas', 'cog']" />Settings
            </g-link>
          </div>
          <div class="mt-1">
            <button @click="$logOut($apollo.provider)">
              <FontAwesomeIcon
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

<script>
// Either authenticate or refresh token on page load.
if (typeof window !== 'undefined') {
  const jwt = localStorage.getItem('jwt')

  if (jwt === null) {
    global.methods.$authenticateAnonymous(this.app.apolloProvider)
  } else {
    global.methods.$jwtRefresh(this.app.apolloProvider)
  }
}

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
    this.$jwtDecode((_jwt, jwtDecoded) => {
      if (
        jwtDecoded.role === 'maevsi_account' &&
        jwtDecoded.exp > Math.floor(new Date() / 1000)
      ) {
        this.loggedInUsername = jwtDecoded.username
      }
    })
  },
  metaInfo() {
    return {
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/assets/static/favicon/apple-touch-icon.png?v=bOXMwoKlJr',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/assets/static/favicon/favicon-32x32.png?v=bOXMwoKlJr',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/assets/static/favicon/favicon-16x16.png?v=bOXMwoKlJr',
        },
        {
          rel: 'manifest',
          href: '/assets/static/favicon/site.webmanifest?v=bOXMwoKlJr',
        },
        {
          rel: 'mask-icon',
          href: '/assets/static/favicon/safari-pinned-tab.svg?v=bOXMwoKlJr',
          color: '#202020',
        },
        {
          rel: 'shortcut icon',
          href: '/assets/static/favicon/favicon.ico?v=bOXMwoKlJr',
        },
      ],
      meta: [
        {
          name: 'msapplication-TileColor',
          content: '#202020',
        },
        {
          name: 'msapplication-config',
          content: '/assets/static/favicon/browserconfig.xml?v=bOXMwoKlJr',
        },
        {
          name: 'theme-color',
          content: '#202020',
        },
      ],
    }
  },
  methods: {
    updateColorMode(mM) {
      this.colorMode = mM.matches ? 'dark' : 'light'
    },
  },
}
</script>
