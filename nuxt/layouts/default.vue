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
        <div class="flex flex-col">
          <!-- TODO: Replace with language picker: https://github.com/maevsi/maevsi/issues/290. -->
          <span class="font-medium leading-7 text-lg">
            <FontAwesomeIcon :icon="['fas', 'language']" title="language" />
          </span>
          <AppLink
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
          >
            {{ locale.name }}
          </AppLink>
        </div>
        <FooterCategory :heading="$t('legal')">
          <AppLink to="/legal-notice">
            {{ $t('legalNotice') }}
          </AppLink>
          <AppLink to="/privacy-policy">
            {{ $t('privacyPolicy') }}
          </AppLink>
        </FooterCategory>
        <FooterCategory :heading="$t('quickLinks')">
          <AppLink
            :icon-id="['fab', 'github']"
            :title="$t('githubLinkTitle')"
            to="https://github.com/maevsi/maevsi/"
          >
            github.com/maevsi/maevsi
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
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
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
  eventUnlock: 'Einladungscode eingeben'
  eventNew: 'Veranstaltung erstellen'
  home: 'Nach Hause'
  legal: 'Rechtliches'
  legalNotice: 'Impressum'
  menuHide: 'Menü verstecken'
  menuShow: 'Menü anzeigen'
  signOut: 'Abmelden'
  privacyPolicy: 'Datenschutzerklärung'
  quickLinks: 'Quick Links'
  session: 'Sitzung'
  settings: 'Einstellungen'
en:
  account: 'Account'
  browserUnsupported: "Your browser's version is not officially supported. Please use a version that is up to date."
  eventUnlock: 'Enter invitation code'
  eventNew: 'Create event'
  home: 'Head home'
  legal: 'Legal'
  legalNotice: 'Legal notice'
  menuHide: 'Hide menu'
  menuShow: 'Show menu'
  signOut: 'Sign out'
  privacyPolicy: 'Privacy policy'
  quickLinks: 'Quick Links'
  session: 'Session'
  settings: 'Settings'
</i18n>
