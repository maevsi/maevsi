<template>
  <div class="h-full relative w-full">
    <ButtonIcon
      v-if="isClosable"
      :aria-label="$t('menuHide')"
      class="absolute right-0 top-0"
      @click="$emit('onMenuHide')"
    >
      <IconX class="h-6 w-6" />
    </ButtonIcon>
    <div class="flex flex-col mx-4 lg:mx-6 xl:mx-8 self-stretch">
      <AppLink
        :aria-label="$t('home')"
        class="hidden md:block justify-self-center rounded"
        :to="localePath('/')"
      >
        <div id="logo" class="h-10 w-32" />
      </AppLink>
      <MenuItem
        :icon-id="['fas', 'user']"
        :to="localePath(`/account/${$store.state.signedInUsername || ''}`)"
        @click="$emit('onMenuHide')"
      >
        {{ $store.state.signedInUsername || $t('account') }}
        <template v-if="$store.state.signedInUsername" slot="image">
          <AccountProfilePicture
            class="h-full p-2 w-full"
            height="48"
            rounded
            :username="$store.state.signedInUsername"
            width="48"
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
          @click="$emit('onMenuHide')"
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
      <MenuItem
        :icon-id="['fas', 'plus']"
        :to="localePath('/task/event/create')"
        @click="$emit('onMenuHide')"
      >
        {{ $t('eventNew') }}
      </MenuItem>
      <MenuItem
        :icon-id="['fas', 'key']"
        :to="localePath('/task/event/unlock')"
        @click="$emit('onMenuHide')"
      >
        {{ $t('eventUnlock') }}
      </MenuItem>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isClosable: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<i18n lang="yml">
de:
  account: Konto
  eventUnlock: Einladungscode eingeben
  eventNew: Veranstaltung erstellen
  home: Nach Hause
  menuHide: Menü verstecken
  settings: Einstellungen
  signOut: Abmelden
en:
  account: Account
  eventUnlock: Enter invitation code
  eventNew: Create event
  home: Head home
  menuHide: Hide menu
  settings: Settings
  signOut: Sign out
</i18n>
