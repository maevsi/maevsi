<template>
  <div class="container mx-auto p-4 text-center">
    <header class="flex items-center justify-between mb-4 relative">
      <g-link to="/">
        <g-image
          alt="mævsi logo"
          src="~/assets/maevsi_with-text.svg"
          width="135"
        />
      </g-link>
      <div class="dropdown">
        <g-link :to="'/accounts/' + (loggedInUsername === null ? '' : loggedInUsername)">
          <font-awesome
            class="mr-2"
            :icon="['fas', 'user']"
          />{{ loggedInUsername === null ? 'Account' : loggedInUsername }}
        </g-link>
        <div class="absolute dropdown-content right-0">
          <div class="mt-1">
            <button
              v-if="loggedInUsername !== null"
              @click="$logOut($apollo.provider); loggedInUsername = null"
            >
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

<style>
.dropdown-content {
  display: none;
}

.dropdown-content > * {
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data () {
    return {
      loggedInUsername: null
    }
  },
  created () {
    if (typeof window !== 'undefined') {
      const jwt = localStorage.getItem('jwt')

      if (jwt !== null) {
        const jwtDecoded = jwtDecode(jwt)

        if (jwtDecoded.exp > Math.floor(new Date() / 1000) && jwtDecoded.role === 'maevsi_account') {
          this.loggedInUsername = jwtDecoded.username
        }
      }
    }
  }
}
</script>
