<template>
  <header class="mb-8">
    <CardStateInfo v-if="!isBrowserSupported" is-edgy>
      {{ $t('browserUnsupported') }}
    </CardStateInfo>
    <div class="flex items-center justify-between gap-4">
      <ButtonIcon
        :aria-label="$t('menuShow')"
        class="md:hidden"
        @click="$emit('onMenuShow')"
      >
        <IconMenu classes="h-8 w-8" />
      </ButtonIcon>
      <Button :aria-label="$t('home')" :to="localePath('/')">
        <div id="logo" class="h-10 w-32" />
      </Button>
      <div class="hidden md:block flex-grow" />
      <!-- <div class="hidden xl:flex">
        <label class="hidden" for="search">{{ $t('search') }}</label>
        <input
          id="search"
          class="form-input cursor-pointer rounded-r-none"
          :placeholder="$t('search')"
          readonly
          type="text"
          @click="navigateToSearch"
        />
        <span
          class="inline-flex cursor-pointer items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
          @click="navigateToSearch"
        >
          <IconSearch />
        </span>
      </div> -->
      <div class="flex items-center gap-2 lg:gap-4 whitespace-nowrap">
        <ButtonText
          :aria-label="$t('events')"
          class="hidden md:flex"
          :to="localePath('/event')"
          :is-primary="false"
        >
          {{ $t('events') }}
          <template slot="prefix">
            <IconTelescope />
          </template>
        </ButtonText>
        <ButtonEventNew class="hidden md:flex" />
        <div
          class="bg-gray-300 dark:bg-gray-600 self-stretch w-px hidden md:flex my-1"
        />
        <ButtonColored
          v-if="signedInUsername"
          :aria-label="$t('dashboard')"
          class="hidden md:block mx-2"
          :is-primary="false"
          :to="localePath('/dashboard')"
        >
          {{ $t('dashboard') }}
        </ButtonColored>
        <Button
          v-if="signedInUsername"
          :aria-label="signedInUsername"
          class="flex min-w-0 items-center gap-2 text-text-dark dark:text-text-bright"
          :title="$t('profileLink')"
          :to="localePath(`/account/${signedInUsername}`)"
          @click.native="$emit('onMenuHide')"
        >
          <AccountProfilePicture
            height="40"
            rounded
            :username="signedInUsername"
            width="40"
          />
        </Button>
        <div v-else>
          <ButtonIcon
            :aria-label="$t('signIn')"
            class="md:hidden h-8 w-8"
            :to="localePath('/task/account/sign-in')"
          >
            <IconSignIn classes="h-6 w-6" />
          </ButtonIcon>
          <ButtonText
            :aria-label="$t('signIn')"
            class="hidden md:inline-block"
            :to="localePath('/task/account/sign-in')"
          >
            {{ $t('signIn') }}
          </ButtonText>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

import { defineComponent } from '#app'

import supportedBrowsers from '~/supportedBrowsers'

export default defineComponent({
  name: 'MaevsiHeader',
  data() {
    return {
      isBrowserSupported: true,
    }
  },
  computed: {
    ...mapGetters(['signedInUsername']),
  },
  beforeMount() {
    this.isBrowserSupported = supportedBrowsers.test(navigator.userAgent)
  },
  methods: {
    navigateToSearch() {
      this.$router.push({
        path: this.localePath(`/task/search`),
        query: { q: 'search phrase' },
      })
    },
  },
})
</script>

<i18n lang="yml">
de:
  browserUnsupported: Dein Browser scheint veraltet zu sein. Manche Dinge könnten deshalb nicht funktionieren oder komisch aussehen.
  dashboard: Dashboard
  events: Veranstaltungen entdecken
  home: Nach Hause
  menuShow: Menü anzeigen
  profileLink: Profilseite anzeigen
  search: Suche
  signIn: Anmelden
  signOut: Abmelden
en:
  browserUnsupported: Your browser seems outdated. Some things might not work or look funny because of this.
  dashboard: Dashboard
  events: Explore events
  home: Head home
  menuShow: Show menu
  profileLink: Show profile page
  search: Search
  signIn: Sign in
  signOut: Sign out
</i18n>
