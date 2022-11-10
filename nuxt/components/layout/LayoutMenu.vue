<template>
  <nav
    class="w-64 grow bg-background-brighten p-2 dark:bg-background-darken md:w-72 lg:w-80 xl:w-96"
  >
    <div class="flex flex-col">
      <ButtonIcon
        v-if="isClosable"
        :aria-label="t('menuHide')"
        class="self-end"
        @click="emit('onMenuHide')"
      >
        <IconX />
      </ButtonIcon>
      <div class="flex flex-col gap-8 p-6 lg:p-8">
        <!-- <div v-if="signedInUsername" class="mt-0 flex md:mt-auto">
          <Button
            :aria-label="signedInUsername"
            class="flex min-w-0 items-center gap-2 text-text-dark dark:text-text-bright"
            :title="t('profileLink')"
            :to="localePath(`/account/${signedInUsername}`)"
            @click.native="emit('onMenuHide')"
          >
            <AccountProfilePicture
              height="40"
              rounded
              :username="signedInUsername"
              width="40"
            />
            <span class="truncate">{{ signedInUsername }}</span>
          </Button>
          <div class="w-12 flex-1" />
          <div class="flex items-center gap-2">
            <ButtonIcon
              :aria-label="t('accountSettings')"
              :title="t('accountSettings')"
              :to="localePath(`/account/${signedInUsername}/settings`)"
              @click.native="emit('onMenuHide')"
            >
              <IconCog />
            </ButtonIcon>
            <ButtonIcon
              :aria-label="t('signOut')"
              :title="t('signOut')"
              @click.native="signOut($urql, store)"
            >
              <IconSignOut />
            </ButtonIcon>
          </div>
        </div>
        <Hr v-if="signedInUsername" />
        <div class="flex flex-col gap-2">
          <ButtonMenu
            v-if="signedInUsername"
            :aria-label="t('events')"
            :to="localePath(`/event/${signedInUsername}`)"
          >
            <IconCalendar />
            {{ t('events') }}
          </ButtonMenu>
          <ButtonMenu
            v-if="signedInUsername"
            :aria-label="t('contacts')"
            :to="localePath('/contact')"
          >
            <IconAddressBook />
            {{ t('contacts') }}
          </ButtonMenu>
          <ButtonMenu
            v-if="signedInUsername"
            :aria-label="t('uploads')"
            :to="localePath('/upload')"
          >
            <IconImages />
            {{ t('uploads') }}
          </ButtonMenu>
        </div>
        <Hr v-if="signedInUsername" class="md:hidden" /> -->
        <div class="flex flex-col gap-4">
          <ButtonText
            :aria-label="t('eventsExplore')"
            :is-primary="false"
            :to="localePath('/event')"
            @click.native="emit('onMenuHide')"
          >
            {{ t('eventsExplore') }}
            <template #prefix>
              <IconTelescope />
            </template>
          </ButtonText>
          <ButtonEventNew @click.native="emit('onMenuHide')" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
export interface Props {
  isClosable?: boolean
}
withDefaults(defineProps<Props>(), {
  isClosable: false,
})

const emit = defineEmits<{
  (e: 'onMenuShow'): void
  (e: 'onMenuHide'): void
}>()

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  accountSettings: Konto bearbeiten
  contacts: Meine Kontakte
  eventNew: Veranstaltung erstellen
  events: Meine Veranstaltungen
  eventsExplore: Veranstaltungen entdecken
  menuHide: Menü verstecken
  profileLink: Profilseite anzeigen
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
  profileLink: Show profile page
  settings: Settings
  signIn: Sign in
  signOut: Sign out
  uploads: My images
</i18n>
