<template>
  <header class="mb-8">
    <div class="flex items-center justify-between gap-4">
      <ButtonIcon
        :aria-label="t('menuShow')"
        class="lg:hidden"
        @click="emit('onMenuShow')"
      >
        <IconMenu classes="h-8 w-8" />
      </ButtonIcon>
      <Button :aria-label="t('home')" :to="localePath('/')">
        <div id="logo" class="h-10 w-32" />
      </Button>
      <div class="hidden lg:block flex-grow" />
      <!-- <div class="hidden xl:flex">
        <label class="hidden" for="search">{{ t('search') }}</label>
        <input
          id="search"
          class="form-input cursor-pointer rounded-r-none"
          :placeholder="t('search')"
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
          :aria-label="t('events')"
          class="hidden lg:flex"
          :to="localePath('/event')"
          :is-primary="false"
        >
          {{ t('events') }}
          <template #prefix>
            <IconTelescope />
          </template>
        </ButtonText>
        <ButtonEventNew class="hidden lg:flex" />
        <div
          class="flex-none bg-gray-300 dark:bg-gray-600 self-stretch w-px hidden lg:flex my-1"
        />
        <ButtonColored
          v-if="signedInUsername"
          :aria-label="t('dashboard')"
          class="hidden lg:block mx-2"
          :is-primary="false"
          :to="localePath('/dashboard')"
        >
          {{ t('dashboard') }}
        </ButtonColored>
        <ButtonIcon
          v-if="signedInUsername"
          :aria-label="signedInUsername"
          class="flex-none"
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
        </ButtonIcon>
        <div v-else>
          <ButtonIcon
            :aria-label="t('signIn')"
            class="lg:hidden h-8 w-8"
            :to="localePath('/task/account/sign-in')"
          >
            <IconSignIn classes="h-6 w-6" />
          </ButtonIcon>
          <ButtonText
            :aria-label="t('signIn')"
            class="hidden lg:inline-block"
            :to="localePath('/task/account/sign-in')"
          >
            {{ t('signIn') }}
          </ButtonText>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'

const emit = defineEmits<{
  (e: 'onMenuShow'): void
  (e: 'onMenuHide'): void
}>()

const store = useMaevsiStore()
const localePath = useLocalePath()
const { t } = useI18n()

// computations
const signedInUsername = computed(() => store.signedInUsername)

// // methods
// function navigateToSearch() {
//   navigateTo({
//     path: localePath(`/task/search`),
//     query: { q: 'search phrase' },
//   })
// }
</script>

<i18n lang="yaml">
de:
  dashboard: Dashboard
  events: Veranstaltungen entdecken
  home: Nach Hause
  menuShow: Menü anzeigen
  profileLink: Profilseite anzeigen
  search: Suche
  signIn: Anmelden
  signOut: Abmelden
en:
  dashboard: Dashboard
  events: Explore events
  home: Head home
  menuShow: Show menu
  profileLink: Show profile page
  search: Search
  signIn: Sign in
  signOut: Sign out
</i18n>
