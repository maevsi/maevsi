<template>
  <div>
    <div class="container min-h-screen mx-auto p-4">
      <header>
        <CardInfo v-if="!browserSupported">
          {{ $t('browserUnsupported') }}
        </CardInfo>
        <div class="flex items-center justify-between my-4 relative">
          <nuxt-link :aria-label="$t('home')" :to="localePath('/')">
            <div id="logo" class="h-10 w-32" />
          </nuxt-link>
          <div class="dropdown text-lg">
            <AppLink
              :icon-id="['fas', 'user']"
              :to="`/account/${
                signedInUsername === undefined ? '' : signedInUsername
              }`"
            >
              {{
                signedInUsername === undefined
                  ? $t('account')
                  : signedInUsername
              }}
            </AppLink>
            <div class="absolute dropdown-content right-0">
              <div
                v-if="signedInUsername !== undefined"
                class="flex flex-col items-end"
              >
                <div class="mt-1">
                  <AppLink
                    :icon-id="['fas', 'cog']"
                    :to="`/account/${
                      signedInUsername === undefined ? '' : signedInUsername
                    }/settings`"
                  >
                    {{ $t('settings') }}
                  </AppLink>
                </div>
                <Button
                  :icon-id="['fas', 'sign-out-alt']"
                  @click="$global.signOut($apollo.getClient(), $store)"
                >
                  {{ $t('signOut') }}
                </Button>
              </div>
              <div v-else class="flex flex-col items-end">
                <div class="mt-1">
                  <AppLink
                    :icon-id="['fas', 'user-clock']"
                    :to="localePath('/session')"
                  >
                    {{ $t('session') }}
                  </AppLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <nuxt />
      </main>
    </div>
    <footer>
      <div class="justify-around container flex mx-auto p-4">
        <div class="flex flex-col">
          <FontAwesomeIcon
            :icon="['fas', 'language']"
            class="mb-2"
            title="language"
          />
          <AppLink
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
          >
            {{ locale.name }}
          </AppLink>
        </div>
        <div class="flex flex-col">
          <FontAwesomeIcon
            :icon="['fas', 'balance-scale']"
            class="mb-2"
            title="scale"
          />
          <AppLink to="/legal-notice">
            {{ $t('legal-notice') }}
          </AppLink>
          <AppLink to="/privacy-policy">
            {{ $t('privacyPolicy') }}
          </AppLink>
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

<style>
@layer components {
  .button:focus {
    @apply ring;
  }
}
@layer utilities {
  .maevsi-prose {
    @apply m-auto prose dark:prose-dark sm:prose-sm sm:dark:prose-dark lg:prose-lg lg:dark:prose-dark xl:prose-xl xl:dark:prose-dark;
  }
}
</style>

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
