<template>
  <header class="mb-8">
    <CardInfo v-if="!isBrowserSupported" is-edgy>
      {{ $t('browserUnsupported') }}
    </CardInfo>
    <div class="container flex items-center justify-between mx-auto p-4">
      <AppLink :aria-label="$t('home')" :to="localePath('/')">
        <div id="logo" class="h-10 w-32" />
      </AppLink>
      <ButtonIcon
        :aria-label="$t('menuShow')"
        class="h-8 w-8"
        :icon-id="['fas', 'bars']"
        icon-size="2x"
        @click="$emit('onMenuShow')"
      />
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
  home: Nach Hause
  menuShow: Menü anzeigen
en:
  browserUnsupported: "Your browser's version is not officially supported. Please use a version that is up to date."
  home: Head home
  menuShow: Show menu
</i18n>
