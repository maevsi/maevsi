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
          to="/accounts/"
        >
          <font-awesome
            class="mr-2"
            :icon="['far', 'user']"
          />Account
        </g-link>
        <button
          v-if="loggedIn"
          @click="$logOut($apollo.provider); loggedIn = false"
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
    if (typeof window !== 'undefined') {
      const jwt = localStorage.getItem('jwt')

      if (jwt !== null) {
        const jwtDecoded = jwtDecode(jwt)

        if (jwtDecoded.exp > Math.floor(new Date() / 1000) && jwtDecoded.role === 'maevsi_account') {
          this.loggedIn = true
        }
      }
    }
  }
}
</script>
