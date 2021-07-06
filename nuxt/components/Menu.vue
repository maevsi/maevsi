<template>
  <div>
    <ButtonIcon
      :aria-label="$t('menuHide')"
      class="m-4 xl:m-8"
      :icon-id="['fas', 'times']"
      icon-size="lg"
      @click="$emit('onMenuHide')"
    />
    <div class="flex flex-col mx-8 xl:mx-16 self-stretch">
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

<i18n lang="yml">
de:
  account: Konto
  eventUnlock: Einladungscode eingeben
  eventNew: Veranstaltung erstellen
  menuHide: Menü verstecken
  settings: Einstellungen
  signOut: Abmelden
en:
  account: Account
  eventUnlock: Enter invitation code
  eventNew: Create event
  menuHide: Hide menu
  settings: Settings
  signOut: Sign out
</i18n>
