<template>
  <div class="container mx-auto p-4 text-center">
    <header class="flex items-center justify-between mb-4 relative">
      <g-link to="/">
        <g-image
          alt="maevsi logo"
          src="~/assets/maevsi_with-text.svg"
          width="135"
        />
      </g-link>
      <div class="dropdown text-lg">
        <g-link :to="'/accounts/' + (loggedInUsername === undefined ? '' : loggedInUsername)">
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
            <g-link :to="'/accounts/' + (loggedInUsername === undefined ? '' : loggedInUsername) + '/settings'">
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
      loggedInUsername: undefined
    }
  },
  created () {
    this.$jwtDecode((jwt, jwtDecoded) => {
      if (jwtDecoded.role === 'maevsi_account' && jwtDecoded.exp > Math.floor(new Date() / 1000)) {
        this.loggedInUsername = jwtDecoded.username
      }
    })
  }
}
</script>
