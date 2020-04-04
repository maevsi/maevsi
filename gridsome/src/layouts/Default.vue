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
      <!--<nav>
        <g-link to="/account/">
          <font-awesome class="mr-2" :icon="['far', 'user']" />Account
        </g-link>
      </nav>-->
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
body {
  background: linear-gradient(#34A1F0, #695BC0) fixed;
}

.form-group--error {
  animation-name: shakeError;
  animation-fill-mode: forwards;
  animation-duration: .6s;
  animation-timing-function: ease-in-out;
}

@keyframes shakeError {
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
