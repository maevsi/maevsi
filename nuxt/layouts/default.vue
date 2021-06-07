<template>
  <div>
    <div class="container min-h-screen mx-auto p-4">
      <header>
        <CardInfo v-if="!browserSupported">
          {{ $t('browserUnsupported') }}
        </CardInfo>
        <div class="flex items-center justify-between m-4 relative">
          <AppLink :aria-label="$t('home')" :to="localePath('/')">
            <div id="logo" class="h-10 w-32" />
          </AppLink>
          <ButtonIcon
            :aria-label="$t('menuShow')"
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
        <FooterCategory :heading="$t('product')">
          <AppLink to="/">
            {{ $t('overview') }}
          </AppLink>
          <AppLink to="/#features">
            {{ $t('features') }}
          </AppLink>
          <AppLink to="/#pricing">
            {{ $t('pricing') }}
          </AppLink>
          <!-- <AppLink to="/about/team">
            {{ $t('team') }}
          </AppLink> -->
          <!-- <AppLink to="/about/awards">
            {{ $t('awards') }}
          </AppLink> -->
        </FooterCategory>
        <FooterCategory :heading="$t('languages')">
          <!-- TODO: Replace with language picker: https://github.com/maevsi/maevsi/issues/290. -->
          <AppLink
            v-for="locale in $i18n.locales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
          >
            <span :class="{ disabled: locale.code === $i18n.locale }">
              {{ locale.name }}
            </span>
          </AppLink>
        </FooterCategory>
        <FooterCategory :heading="$t('legal')">
          <AppLink to="/legal-notice">
            {{ $t('legalNotice') }}
          </AppLink>
          <AppLink to="/privacy-policy">
            {{ $t('privacyPolicy') }}
          </AppLink>
          <!-- <AppLink to="/code-of-conduct">
            {{ $t('codeOfConduct') }}
          </AppLink> -->
        </FooterCategory>
        <!-- <FooterCategory :heading="$t('support')">
          <AppLink to="/support/tutorials">
            {{ $t('tutorials') }}
          </AppLink>
          <AppLink to="/support/contact">
            {{ $t('contact') }}
          </AppLink>
          <AppLink to="/support/docs">
            {{ $t('documentation') }}
          </AppLink>
        </FooterCategory> -->
        <FooterCategory :heading="$t('quickLinks')">
          <AppLink
            :title="$t('releases')"
            to="https://github.com/maevsi/maevsi/releases"
          >
            {{ $t('releases') }}
          </AppLink>
          <AppLink
            :title="$t('githubLinkTitle')"
            to="https://github.com/maevsi/"
          >
            {{ $t('sourceCode') }}
          </AppLink>
        </FooterCategory>
      </div>
    </footer>
    <div
      class="
        bg-black
        bottom-0
        duration-500
        fixed
        left-0
        right-0
        top-0
        transition-opacity
      "
      :class="{
        'opacity-50 visible': isMenuVisible,
        'opacity-0 invisible': !isMenuVisible,
      }"
      @click="menuHide()"
    />
    <div
      class="
        bg-background-bright
        dark:bg-background-dark
        bottom-0
        duration-500
        fixed
        flex-col
        inline-flex
        items-start
        overflow-auto
        p-2
        right-0
        top-0
        transform-gpu
        transition-transform
        w-5/6
        md:w-1/2
        lg:w-1/3
      "
      :class="{
        'translate-x-0': isMenuVisible,
        'translate-x-full': !isMenuVisible,
      }"
    >
      <template v-if="isMenuItemsVisible">
        <ButtonIcon
          :aria-label="$t('menuHide')"
          class="m-4 xl:m-8"
          :icon-id="['fas', 'times']"
          icon-size="lg"
          @click="menuHide()"
        />
        <div class="flex flex-col mx-8 xl:mx-16 self-stretch">
          <MenuItem
            :icon-id="['fas', 'user']"
            :to="localePath(`/account/${$store.state.signedInUsername || ''}`)"
            @click="menuHide()"
          >
            {{ $store.state.signedInUsername || $t('account') }}
            <template v-if="$store.state.signedInUsername" slot="image">
              <ProfilePicture
                class="h-full p-2 w-full"
                rounded
                :username="$store.state.signedInUsername"
              />
            </template>
          </MenuItem>
          <template v-if="$store.state.signedInUsername">
            <MenuItem
              :icon-id="['fas', 'cog']"
              :to="
                localePath(
                  `/account/${$store.state.signedInUsername || ''}/settings`
                )
              "
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
            <MenuItem
              :icon-id="['fas', 'plus']"
              :to="localePath('/task/event/create')"
              @click="menuHide()"
            >
              {{ $t('eventNew') }}
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
          <MenuItem
            :icon-id="['fas', 'key']"
            :to="localePath('/task/event/unlock')"
            @click="menuHide()"
          >
            {{ $t('eventUnlock') }}
          </MenuItem>
        </div>
      </template>
    </div>
    <Modal />
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
    return this.$nuxtI18nHead({ addSeoAttributes: true })
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
  awards: 'Auszeichnungen'
  browserUnsupported: 'Die Version deines Browsers wird nicht offiziell unterstützt. Bitte verwende eine aktuelle Version.'
  eventUnlock: 'Einladungscode eingeben'
  eventNew: 'Veranstaltung erstellen'
  features: 'Funktionen'
  githubLinkTitle: 'maevsi auf GitHub'
  home: 'Nach Hause'
  languages: 'Sprachen'
  legal: 'Rechtliches'
  legalNotice: 'Impressum'
  menuHide: 'Menü verstecken'
  menuShow: 'Menü anzeigen'
  overview: 'Überblick'
  pricing: 'Preise'
  privacyPolicy: 'Datenschutz'
  product: 'Produkt'
  quickLinks: 'Quick Links'
  releases: 'Updates'
  session: 'Sitzung'
  settings: 'Einstellungen'
  signOut: 'Abmelden'
  sourceCode: 'Quellcode'
  team: 'Team'
en:
  account: 'Account'
  awards: 'Awards'
  browserUnsupported: "Your browser's version is not officially supported. Please use a version that is up to date."
  eventUnlock: 'Enter invitation code'
  eventNew: 'Create event'
  features: 'Features'
  githubLinkTitle: 'maevsi on GitHub'
  home: 'Head home'
  languages: 'Languages'
  legal: 'Legal'
  legalNotice: 'Legal notice'
  menuHide: 'Hide menu'
  menuShow: 'Show menu'
  overview: 'Overview'
  pricing: 'Pricing'
  privacyPolicy: 'Privacy'
  product: 'Product'
  quickLinks: 'Quick Links'
  releases: 'Releases'
  session: 'Session'
  settings: 'Settings'
  signOut: 'Sign out'
  sourceCode: 'Source code'
  team: 'Team'
</i18n>
