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
        <IconMenu class="h-8 w-8" />
      </ButtonIcon>
      <AppLink
        :aria-label="$t('home')"
        class="justify-self-center md:justify-self-start"
        :to="localePath('/')"
      >
        <div id="logo" class="h-10 w-32" />
      </AppLink>
      <input
        class="col-span-2 md:col-span-1 hidden md:invisible rounded"
        :class="{ 'md:col-span-2': signedInUsername }"
        disabled
        placeholder="search"
        type="text"
      />
      <div
        class="
          col-start-3
          hidden
          md:flex
          items-center
          justify-self-end
          whitespace-nowrap
        "
      >
        <AppLink
          class="
            bg-background-bright
            hover:bg-gray-200
            dark:bg-background-dark dark:hover:bg-black
            border border-gray-300
            dark:border-gray-600
            mr-6
            font-medium
            px-4
            py-2
            rounded-md
            shadow-sm
            dark:shadow-sm-white
            text-center text-text-dark
            dark:text-text-bright
          "
          :is-colored="false"
          :to="
            signedInUsername
              ? localePath('/task/event/create')
              : localePath('/account')
          "
        >
          {{ signedInUsername ? $t('eventNew') : $t('signIn') }}
        </AppLink>
        <AppLink
          class="
            bg-gray-800
            hover:bg-black
            dark:bg-gray-100 dark:hover:bg-gray-200
            border border-transparent
            px-4
            py-2
            rounded-md
            shadow-sm
            dark:shadow-sm-white
            font-medium
            text-center text-text-bright
            dark:text-text-dark
          "
          :is-colored="false"
          :to="localePath('/event')"
        >
          {{ $t('events') }}
        </AppLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'

const supportedBrowsers = require('~/supportedBrowsers')

export default defineComponent({
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
  signIn: Anmelden
en:
  browserUnsupported: "Your browser's version is not officially supported. Please use a version that is up to date."
  eventNew: Create event
  events: Explore events
  home: Head home
  menuShow: Show menu
  signIn: Sign in
</i18n>
