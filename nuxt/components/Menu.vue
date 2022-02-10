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
        <IconX />
      </ButtonIcon>
      <div class="flex flex-col p-6 lg:p-8 gap-8">
        <div v-if="signedInUsername" class="flex mt-0 md:mt-auto">
          <Button
            :aria-label="signedInUsername"
            class="flex items-center min-w-0 gap-2 text-text-dark dark:text-text-bright"
            :to="localePath(`/account/${signedInUsername}`)"
            @click.native="$emit('onMenuHide')"
          >
            <AccountProfilePicture
              height="40"
              rounded
              :username="signedInUsername"
              width="40"
            />
            <span class="truncate">{{ signedInUsername }}</span>
          </Button>
          <!-- Fills the remaining space -->
          <div class="flex-1 w-12" />
          <div class="flex items-center gap-2">
            <ButtonIcon
              :aria-label="$t('accountSettings')"
              :to="localePath(`/account/${signedInUsername}/settings`)"
              @click.native="$emit('onMenuHide')"
            >
              <IconCog />
            </ButtonIcon>
            <ButtonIcon
              :aria-label="$t('signOut')"
              @click.native="$util.signOut($apollo.getClient(), $store)"
            >
              <IconLogout />
            </ButtonIcon>
          </div>
        </div>
        <hr v-if="signedInUsername" class="opacity-40" />
        <Button
          v-if="signedInUsername"
          :aria-label="$t('events')"
          :to="localePath(`/event/${signedInUsername}`)"
          @click.native="$emit('onMenuHide')"
        >
          <IconCalendar />
          {{ $t('events') }}
        </Button>
        <Button
          v-if="signedInUsername"
          :aria-label="$t('contacts')"
          :to="localePath('/contact')"
          @click.native="$emit('onMenuHide')"
        >
          <IconAddressBook />
          {{ $t('contacts') }}
        </Button>
        <Button
          v-if="signedInUsername"
          :aria-label="$t('uploads')"
          :to="localePath('/upload')"
          @click.native="$emit('onMenuHide')"
        >
          <IconImages />
          {{ $t('uploads') }}
        </Button>
        <hr v-if="signedInUsername" class="md:hidden opacity-40" />
        <div class="flex md:hidden flex-col gap-4">
          <ButtonColored
            :aria-label="signedInUsername ? $t('eventNew') : $t('signIn')"
            :is-block="true"
            :is-primary="false"
            :to="
              signedInUsername
                ? localePath('/task/event/create')
                : localePath('/account')
            "
            @click.native="$emit('onMenuHide')"
          >
            {{ signedInUsername ? $t('eventNew') : $t('signIn') }}
          </ButtonColored>
          <ButtonColored
            :aria-label="$t('eventsExplore')"
            :is-block="true"
            :to="localePath('/event')"
            @click.native="$emit('onMenuHide')"
          >
            {{ $t('eventsExplore') }}
          </ButtonColored>
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
