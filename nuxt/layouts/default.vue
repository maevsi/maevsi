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
          <ButtonIcon
            :icon-id="['fas', 'bars']"
            icon-size="2x"
            @click="menuShow()"
          />
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
    <div
      class="bg-black bottom-0 duration-500 fixed left-0 opacity-0 right-0 top-0 transition-opacity"
      :class="{
        'opacity-50 visible': isMenuVisible,
        invisible: !isMenuVisible,
      }"
      @click="menuHide()"
    />
    <div
      class="bg-background-bright dark:bg-background-dark bottom-0 duration-500 fixed flex-col inline-flex items-start overflow-auto p-2 right-0 top-0 transform-gpu transition-transform w-5/6 md:w-1/2 lg:w-1/3"
      :class="{
        'translate-x-0': isMenuVisible,
        'translate-x-full': !isMenuVisible,
      }"
    >
      <template v-if="isMenuItemsVisible">
        <ButtonIcon
          class="m-4 xl:m-8"
          :icon-id="['fas', 'times']"
          icon-size="lg"
          @click="menuHide()"
        />
        <div class="flex flex-col mx-8 xl:mx-16 self-stretch">
          <MenuItem
            :icon-id="['fas', 'user']"
            :to="`/account/${
              signedInUsername === undefined ? '' : signedInUsername
            }`"
            @click="menuHide()"
          >
            {{
              signedInUsername === undefined ? $t('account') : signedInUsername
            }}
            <template v-if="signedInUsername" slot="image">
              <ProfilePicture
                class="h-full p-2 w-full"
                rounded
                :username="signedInUsername"
              />
            </template>
          </MenuItem>
          <template v-if="signedInUsername !== undefined">
            <MenuItem
              :icon-id="['fas', 'cog']"
              :to="`/account/${
                signedInUsername === undefined ? '' : signedInUsername
              }/settings`"
              @click="menuHide()"
            >
              {{ $t('settings') }}
            </MenuItem>
            <MenuItem
              :icon-id="['fas', 'sign-out-alt']"
              @click="$global.signOut($apollo.getClient(), $store)"
            >
              {{ $t('signOut') }}
            </MenuItem>
          </template>
          <template v-else>
            <MenuItem
              :icon-id="['fas', 'user-clock']"
              :to="localePath('/session')"
              @click="menuHide()"
            >
              {{ $t('session') }}
            </MenuItem>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
const supportedBrowsers = require('~/supportedBrowsers')

export default {
  data() {
    return {
      browserSupported: true,
      isMenuVisible: false,
      isMenuItemsVisible: false,
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
  methods: {
    menuHide() {
      this.isMenuVisible = false
      setTimeout(() => {
        this.isMenuItemsVisible = false
      }, 500)
    },
    menuShow() {
      this.isMenuItemsVisible = true
      this.isMenuVisible = true
    },
  },
}
</script>

<style>
@layer components {
  a:focus {
    @apply outline-none;
    @apply ring;
  }
  button:focus {
    @apply outline-none;
    @apply ring;
  }
  .button:focus {
    @apply outline-none;
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
  browserUnsupported: 'Die Version deines Browsers wird nicht offiziell unterstützt. Bitte verwende eine aktuelle Version.'
  home: 'Nach Hause'
  legal-notice: 'Impressum'
  signOut: 'Abmelden'
  privacyPolicy: 'Datenschutzerklärung'
  session: 'Sitzung'
  settings: 'Einstellungen'
en:
  account: 'Account'
  browserUnsupported: "Your browser's version is not officially supported. Please use a version that is up to date."
  home: 'Head home'
  legal-notice: 'Legal notice'
  signOut: 'Sign out'
  privacyPolicy: 'Privacy policy'
  session: 'Session'
  settings: 'Settings'
</i18n>
