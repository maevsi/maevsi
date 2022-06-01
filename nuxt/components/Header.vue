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
      <div>
        <label class="hidden" for="search">{{ $t('search') }}</label>
        <input
          id="search"
          class="col-span-2 hidden rounded md:invisible md:col-span-1"
          :class="{ 'md:col-span-2': signedInUsername }"
          disabled
          placeholder="search"
          type="text"
        />
      </div>
      <div
        class="col-start-3 hidden items-center gap-4 justify-self-end whitespace-nowrap md:flex"
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
  browserUnsupported: Dein Browser scheint veraltet zu sein. Manche Dinge könnten deshalb nicht funktionieren oder komisch aussehen.
  eventNew: Veranstaltung erstellen
  events: Veranstaltungen entdecken
  home: Nach Hause
  menuShow: Menü anzeigen
  search: Suche
  signIn: Anmelden
en:
  browserUnsupported: Your browser seems outdated. Some things might not work or look funny because of this.
  eventNew: Create event
  events: Explore events
  home: Head home
  menuShow: Show menu
  search: Search
  signIn: Sign in
</i18n>
