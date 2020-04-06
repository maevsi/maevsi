<template>
  <div class="container mx-auto p-4 text-center">
    <header class="flex items-center justify-between mb-4">
      <g-link to="/">
        <g-image
          alt="mævsi logo"
          src="~/assets/maevsi_with-text.svg"
          width="135"
        />
      </g-link>
      <g-link
        v-if="this.$route.path == '/events/'"
        to="/redeem/"
      >
        <font-awesome
          class="mr-2"
          :icon="['fas', 'plus']"
        />Redeem
      </g-link>
      <div>
        <g-link
          v-if="!loggedIn"
          to="/account/"
        >
          <font-awesome
            class="mr-2"
            :icon="['far', 'user']"
          />Account
        </g-link>
        <button
          v-if="loggedIn"
          @click="logOut"
        >
          <font-awesome
            class="mr-2"
            :icon="['fas', 'sign-out-alt']"
          />Log Out
        </button>
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
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(0.375rem);
  }
  30% {
    transform: translateX(-0.375rem);
  }
  45% {
    transform: translateX(0.375rem);
  }
  60% {
    transform: translateX(-0.375rem);
  }
  75% {
    transform: translateX(0.375rem);
  }
  90% {
    transform: translateX(-0.375rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data () {
    return {
      loggedIn: false
    }
  },
  created () {
    const jwt = localStorage.getItem('jwt')

    if (jwt !== null) {
      const jwtDecoded = jwtDecode(jwt)

      if (jwtDecoded.exp > Math.floor(new Date() / 1000) && jwtDecoded.username !== null) {
        this.loggedIn = true
      }
    }
  },
  methods: {
    logOut (e) {
      localStorage.removeItem('jwt')

      const jwtAnonymous = localStorage.getItem('jwt_anonymous')

      if (jwtAnonymous !== undefined) {
        localStorage.setItem('jwt', jwtAnonymous)
        localStorage.removeItem('jwt_anonymous')
      }

      location.reload()
    }
  }
}
</script>
