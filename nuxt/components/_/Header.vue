<template>
  <header class="bg-background-bright dark:bg-background-dark">
    <CardStateInfo v-if="!isBrowserSupported" is-edgy>
      {{ $t('browserUnsupported') }}
    </CardStateInfo>
    <div
      class="mx-auto grid grid-cols-3 items-center p-4 md:px-8"
      :class="{ container: !signedInUsername }"
    >
      <ButtonIcon
        :aria-label="$t('menuShow')"
        class="justify-self-start md:hidden"
        @click="$emit('onMenuShow')"
      >
        <IconMenu classes="h-8 w-8" />
      </ButtonIcon>
      <Button
        :aria-label="$t('home')"
        class="justify-self-center md:justify-self-start"
        :to="localePath('/')"
      >
        <div id="logo" class="h-10 w-32" />
      </Button>
      <div class="hidden xl:flex">
        <label class="hidden" for="search">{{ $t('search') }}</label>
        <input
          id="search"
          class="form-input cursor-pointer rounded-r-none"
          :class="{ 'md:col-span-2': signedInUsername }"
          :placeholder="$t('events')"
          readonly
          type="text"
          @click="navigateToEvents"
        />
        <span
          class="inline-flex cursor-pointer items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
          @click="navigateToEvents"
        >
          <IconSearch />
        </span>
      </div>
      <div
        class="col-start-3 hidden items-center gap-4 justify-self-end whitespace-nowrap md:flex"
      >
        <ButtonEventNew />
        <ButtonColored
          v-if="signedInUsername"
          :aria-label="$t('signOut')"
          :is-primary="false"
          @click="$util.signOut($apollo.getClient(), $store)"
        >
          {{ $t('signOut') }}
        </ButtonColored>
        <ButtonColored
          v-else
          :aria-label="$t('signIn')"
          :is-primary="false"
          :to="localePath('/account')"
        >
          {{ $t('signIn') }}
        </ButtonColored>
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
    navigateToEvents() {
      this.$router.push({
        path: this.localePath(`/event`),
        query: { q: 'search phrase' },
      })
    },
  },
})
</script>

<i18n lang="yml">
de:
  browserUnsupported: Dein Browser scheint veraltet zu sein. Manche Dinge könnten deshalb nicht funktionieren oder komisch aussehen.
  events: Veranstaltungen entdecken
  home: Nach Hause
  menuShow: Menü anzeigen
  search: Suche
  signIn: Anmelden
  signOut: Abmelden
en:
  browserUnsupported: Your browser seems outdated. Some things might not work or look funny because of this.
  events: Explore events
  home: Head home
  menuShow: Show menu
  search: Search
  signIn: Sign in
  signOut: Sign out
</i18n>
