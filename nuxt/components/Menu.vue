<template>
  <nav
    class="bg-background-bright dark:bg-background-dark h-full w-64 md:w-72 lg:w-80 xl:w-96 p-2"
  >
    <div class="flex flex-col">
      <ButtonIcon
        v-if="isClosable"
        :aria-label="$t('menuHide')"
        class="self-end"
        @click="$emit('onMenuHide')"
      >
        <IconX class="h-6 w-6" />
      </ButtonIcon>
      <div class="flex flex-col p-6 lg:p-8 space-y-8">
        <div v-if="signedInUsername" class="flex mt-0 md:mt-auto">
          <AppLink
            class="flex items-center min-w-0 space-x-2 text-text-dark dark:text-text-bright"
            :is-colored="false"
            :to="localePath(`/account/${signedInUsername}`)"
            @click="$emit('onMenuHide')"
          >
            <AccountProfilePicture
              height="40"
              rounded
              :username="signedInUsername"
              width="40"
            />
            <span class="truncate">{{ signedInUsername }}</span>
          </AppLink>
          <!-- Fills the remaining space -->
          <div class="flex-1 w-12" />
          <div class="flex items-center space-x-2">
            <ButtonIcon
              :aria-label="$t('accountSettings')"
              :to="localePath(`/account/${signedInUsername}/settings`)"
              @click="$emit('onMenuHide')"
            >
              <IconCog class="h-6 w-6" />
            </ButtonIcon>
            <ButtonIcon
              :aria-label="$t('signOut')"
              @click="$global.signOut($apollo.getClient(), $store)"
            >
              <IconLogout class="h-6 w-6" />
            </ButtonIcon>
          </div>
        </div>
        <hr v-if="signedInUsername" class="opacity-40" />
        <Button
          v-if="signedInUsername"
          :aria-label="$t('events')"
          class="text-left"
          :to="localePath(`/event/${signedInUsername}`)"
          @click.native="$emit('onMenuHide')"
        >
          <div class="inline-block text-center w-8">
            <FontAwesomeIcon :icon="['fas', 'calendar-day']" size="lg" />
          </div>
          {{ $t('events') }}
        </Button>
        <Button
          v-if="signedInUsername"
          :aria-label="$t('contacts')"
          class="text-left"
          :to="localePath('/contact')"
          @click.native="$emit('onMenuHide')"
        >
          <div class="inline-block text-center w-8">
            <FontAwesomeIcon :icon="['fas', 'address-book']" size="lg" />
          </div>
          {{ $t('contacts') }}
        </Button>
        <Button
          v-if="signedInUsername"
          :aria-label="$t('uploads')"
          class="text-left"
          :to="localePath('/upload')"
          @click.native="$emit('onMenuHide')"
        >
          <div class="inline-block text-center w-8">
            <FontAwesomeIcon class="w-6" :icon="['fas', 'images']" size="lg" />
          </div>
          {{ $t('uploads') }}
        </Button>
        <hr v-if="signedInUsername" class="md:hidden opacity-40" />
        <div class="flex flex-col space-y-4">
          <AppLink
            class="bg-background-bright hover:bg-gray-200 dark:bg-background-dark dark:hover:bg-black border border-gray-300 dark:border-gray-600 font-medium md:hidden px-4 py-2 rounded-md shadow-sm dark:shadow-sm-white text-center text-text-dark dark:text-text-bright"
            :is-colored="false"
            :to="
              signedInUsername
                ? localePath('/task/event/create')
                : localePath('/account')
            "
            @click="$emit('onMenuHide')"
          >
            {{ signedInUsername ? $t('eventNew') : $t('signIn') }}
          </AppLink>
          <AppLink
            class="bg-gray-800 hover:bg-black dark:bg-gray-100 dark:hover:bg-gray-200 border border-transparent md:hidden px-4 py-2 rounded-md shadow-sm dark:shadow-sm-white font-medium text-center text-text-bright dark:text-text-dark"
            :is-colored="false"
            :to="localePath('/event')"
            @click="$emit('onMenuHide')"
          >
            {{ $t('eventsExplore') }}
          </AppLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

import { defineComponent } from '#app'

export default defineComponent({
  name: 'MaevsiMenu',
  props: {
    isClosable: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(['signedInUsername']),
  },
})
</script>

<i18n lang="yml">
de:
  accountSettings: Konto bearbeiten
  contacts: Meine Kontakte
  eventNew: Veranstaltung erstellen
  events: Meine Veranstaltungen
  eventsExplore: Veranstaltungen entdecken
  menuHide: Menü verstecken
  settings: Einstellungen
  signIn: Anmelden
  signOut: Abmelden
  uploads: Meine Bilder
en:
  accountSettings: Edit account
  contacts: My contacts
  eventNew: Create event
  events: My events
  eventsExplore: Explore events
  menuHide: Hide menu
  settings: Settings
  signIn: Sign in
  signOut: Sign out
  uploads: My images
</i18n>
