<template>
  <div>
    <div class="container min-h-screen mx-auto p-4 text-center">
      <header>
        <Warning v-if="!browserSupported">
          {{ $t('browserUnsupported') }}
        </Warning>
        <div class="flex items-center justify-between mb-4 relative">
          <nuxt-link :aria-label="$t('home')" :to="localePath('/')">
            <div id="logo" class="h-10 w-32" />
          </nuxt-link>
          <div class="dropdown text-lg">
            <nuxt-link
              class="button"
              :to="
                localePath(
                  '/account/' +
                    (signedInUsername === undefined ? '' : signedInUsername)
                )
              "
            >
              <FontAwesomeIcon class="mr-2" :icon="['fas', 'user']" />{{
                signedInUsername === undefined
                  ? $t('account')
                  : signedInUsername
              }}
            </nuxt-link>
            <div class="absolute dropdown-content right-0">
              <div
                v-if="signedInUsername !== undefined"
                class="flex flex-col items-end"
              >
                <div class="mt-1">
                  <nuxt-link
                    class="button"
                    :to="
                      localePath(
                        '/account/' +
                          (signedInUsername === undefined
                            ? ''
                            : signedInUsername) +
                          '/settings'
                      )
                    "
                  >
                    <FontAwesomeIcon class="mr-2" :icon="['fas', 'cog']" />
                    {{ $t('settings') }}
                  </nuxt-link>
                </div>
                <div class="mt-1">
                  <button
                    type="button"
                    @click="$global.signOut($apollo.getClient(), $store)"
                  >
                    <FontAwesomeIcon
                      class="mr-2"
                      :icon="['fas', 'sign-out-alt']"
                    />{{ $t('signOut') }}
                  </button>
                </div>
              </div>
              <div v-else class="flex flex-col items-end">
                <div class="mt-1">
                  <nuxt-link class="button" :to="localePath('/session')">
                    <FontAwesomeIcon
                      class="mr-2"
                      :icon="['fas', 'user-clock']"
                    />{{ $t('session') }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nuxt />
    </div>
    <footer>
      <div class="justify-around container flex mx-auto p-4">
        <div class="flex flex-col">
          <FontAwesomeIcon
            :icon="['fas', 'language']"
            class="my-2"
            title="language"
          />
          <nuxt-link
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            >{{ locale.name }}</nuxt-link
          >
        </div>
        <div class="flex flex-col">
          <FontAwesomeIcon
            :icon="['fas', 'balance-scale']"
            class="my-2"
            title="scale"
          />
          <nuxt-link :to="localePath('/legal-notice')">{{
            $t('legal-notice')
          }}</nuxt-link>
          <nuxt-link :to="localePath('/privacy-policy')">{{
            $t('privacyPolicy')
          }}</nuxt-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
const supportedBrowsers = require('~/supportedBrowsers')

export default {
  data() {
    return {
      browserSupported: true,
    }
  },
  head() {
    return this.$nuxtI18nSeo()
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    signedInUsername() {
      return this.$store.state.jwtDecoded &&
        this.$store.state.jwtDecoded.role === 'maevsi_account' &&
        this.$store.state.jwtDecoded.exp > Math.floor(Date.now() / 1000)
        ? this.$store.state.jwtDecoded.username
        : undefined
    },
  },
  beforeCreate() {
    this.$moment.locale(this.$i18n.locale)
  },
  beforeMount() {
    this.browserSupported = supportedBrowsers.test(navigator.userAgent)
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
  account: 'Konto'
  browserUnsupported: 'Diese Browserversion wird nicht unterstützt.'
  home: 'Nach Hause'
  legal-notice: 'Impressum'
  signOut: 'Abmelden'
  privacyPolicy: 'Datenschutzerklärung'
  session: 'Sitzung'
  settings: 'Einstellungen'
en:
  account: 'Account'
  browserUnsupported: 'This browser version is not supported.'
  home: 'Head home'
  legal-notice: 'Legal notice'
  signOut: 'Sign out'
  privacyPolicy: 'Privacy policy'
  session: 'Session'
  settings: 'Settings'
</i18n>
