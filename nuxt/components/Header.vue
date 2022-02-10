<template>
  <header class="bg-background-bright dark:bg-background-dark">
    <CardInfo v-if="!isBrowserSupported" is-edgy>
      {{ $t('browserUnsupported') }}
    </CardInfo>
    <div
      class="grid grid-cols-3 items-center mx-auto p-4 md:px-8"
      :class="{ container: !signedInUsername }"
    >
      <ButtonIcon
        :aria-label="$t('menuShow')"
        class="md:hidden justify-self-start"
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
      <div>
        <label class="hidden" for="search">{{ $t('search') }}</label>
        <input
          id="search"
          class="col-span-2 md:col-span-1 hidden md:invisible rounded"
          :class="{ 'md:col-span-2': signedInUsername }"
          disabled
          placeholder="search"
          type="text"
        />
      </div>
      <div
        class="col-start-3 hidden md:flex gap-4 items-center justify-self-end whitespace-nowrap"
      >
        <ButtonColored
          :aria-label="signedInUsername ? $t('events') : $t('signIn')"
          :is-primary="false"
          :to="signedInUsername ? localePath('/event') : localePath('/account')"
        >
          {{ signedInUsername ? $t('events') : $t('signIn') }}
        </ButtonColored>
        <ButtonColored
          :aria-label="signedInUsername ? $t('eventNew') : $t('events')"
          :to="
            signedInUsername
              ? localePath('/task/event/create')
              : localePath('/event')
          "
        >
          {{ signedInUsername ? $t('eventNew') : $t('events') }}
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
})
</script>

<i18n lang="yml">
de:
  browserUnsupported: Die Version deines Browsers wird nicht offiziell unterstützt. Bitte verwende eine aktuelle Version.
  eventNew: Veranstaltung erstellen
  events: Veranstaltungen entdecken
  home: Nach Hause
  menuShow: Menü anzeigen
  search: Suche
  signIn: Anmelden
en:
  browserUnsupported: "Your browser's version is not officially supported. Please use a version that is up to date."
  eventNew: Create event
  events: Explore events
  home: Head home
  menuShow: Show menu
  search: Search
  signIn: Sign in
</i18n>
