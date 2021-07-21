<template>
  <header>
    <CardInfo v-if="!isBrowserSupported" is-edgy>
      {{ $t('browserUnsupported') }}
    </CardInfo>
    <div class="container grid grid-cols-3 items-center mx-auto p-4">
      <AppLink
        :aria-label="$t('home')"
        class="col-start-2 justify-self-center"
        :to="localePath('/')"
      >
        <div id="logo" class="h-10 w-32" />
      </AppLink>
      <ButtonIcon
        :aria-label="$t('menuShow')"
        class="md:hidden justify-self-end"
        @click="$emit('onMenuShow')"
      >
        <IconMenu class="h-8 w-8" />
      </ButtonIcon>
      <div class="hidden md:flex flex-1 items-center justify-self-end">
        <AppLink
          class="
            bg-background-bright
            hover:bg-gray-200
            dark:bg-background-dark dark:hover:bg-black
            border border-gray-300
            dark:border-gray-600
            mr-8
            font-medium
            px-4
            py-2
            rounded-md
            shadow-sm
            dark:shadow-sm-white
            text-text-dark
            dark:text-text-bright
          "
          :to="localePath('/event')"
        >
          {{ $t('events') }}
        </AppLink>
        <AppLink
          v-if="$store.state.signedInUsername"
          class="hidden md:block"
          :to="localePath(`/account/${$store.state.signedInUsername}`)"
        >
          <AccountProfilePicture
            class="shadow-sm dark:shadow-sm-white"
            height="40"
            rounded
            :username="$store.state.signedInUsername"
            width="40"
          />
        </AppLink>
        <AppLink
          v-else
          class="
            bg-gray-800
            hover:bg-black
            dark:bg-gray-100 dark:hover:bg-gray-200
            border border-transparent
            px-4
            py-2
            rounded-md
            shadow-sm
            dark:shadow-sm-white
            font-medium
            text-text-bright
            dark:text-text-dark
          "
          :to="localePath('/account')"
        >
          {{ $t('signIn') }}
        </AppLink>
      </div>
    </div>
  </header>
</template>

<script>
const supportedBrowsers = require('~/supportedBrowsers')

export default {
  data() {
    return {
      isBrowserSupported: true,
    }
  },
  beforeMount() {
    this.isBrowserSupported = supportedBrowsers.test(navigator.userAgent)
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

<i18n lang="yml">
de:
  browserUnsupported: Die Version deines Browsers wird nicht offiziell unterstützt. Bitte verwende eine aktuelle Version.
  events: Veranstaltungen
  home: Nach Hause
  menuShow: Menü anzeigen
  signIn: Anmelden
en:
  browserUnsupported: "Your browser's version is not officially supported. Please use a version that is up to date."
  events: Events
  home: Head home
  menuShow: Show menu
  signIn: Sign in
</i18n>
