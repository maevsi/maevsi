<template>
  <!-- <Loader :api="api" indicator="ping"> -->
  <header class="lg:mb-8">
    <div class="flex items-center justify-between gap-4">
      <ButtonIcon
        :aria-label="store.isSidebarVisible ? t('menuHide') : t('menuShow')"
        class="hidden lg:block 2xl:hidden"
        @click="store.isSidebarVisible = !store.isSidebarVisible"
      >
        <IHeroiconsBars3 height="2em" width="2em" />
      </ButtonIcon>
      <Button
        :aria-label="t('home')"
        class="hidden 2xl:block"
        :to="localePath('/')"
      >
        <IconLogoWithText class="h-10 w-32" />
      </Button>
      <div class="hidden flex-grow lg:block" />
      <div class="hidden lg:flex">
        <SearchBar />
      </div>
      <div class="flex-grow" />
      <div>
        <div
          class="hidden items-center gap-2 whitespace-nowrap lg:gap-4 2xl:flex"
        >
          <ButtonText
            :aria-label="t('events')"
            class="hidden lg:flex"
            :to="localePath('/event')"
            :is-primary="false"
          >
            {{ t('events') }}
            <template #prefix>
              <ISolarTelescopeBold />
            </template>
          </ButtonText>
          <ButtonEventNew class="hidden lg:flex" variant="text" />
          <div
            class="my-1 hidden w-px flex-none self-stretch bg-gray-300 dark:bg-gray-600 lg:flex"
          />
          <ButtonColored
            v-if="store.signedInAccountId"
            :aria-label="t('dashboard')"
            class="mx-2 hidden lg:block"
            :is-primary="false"
            :to="localePath('/dashboard')"
          >
            {{ t('dashboard') }}
          </ButtonColored>
          <ButtonIcon
            v-if="store.signedInUsername && store.signedInAccountId"
            :aria-label="store.signedInUsername"
            :title="t('profileLink')"
            :to="localePath(`/account/view/${store.signedInUsername}`)"
          >
            <AccountProfilePicture
              :account-id="store.signedInAccountId"
              classes="h-10 rounded-full w-10"
              height="40"
              width="40"
            />
          </ButtonIcon>
          <template v-else>
            <ButtonIcon
              :aria-label="t('signIn')"
              class="h-8 w-8 lg:hidden"
              :to="localePath('/session/create')"
            >
              <IHeroiconsOutlineLogin />
            </ButtonIcon>
            <ButtonText
              :aria-label="t('signIn')"
              class="hidden lg:inline-block"
              :to="localePath('/session/create')"
            >
              {{ t('signIn') }}
            </ButtonText>
          </template>
        </div>
      </div>
    </div>
  </header>
  <!-- </Loader> -->
</template>

<script setup lang="ts">
const store = useMaevsiStore()
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  dashboard: Dashboard
  events: Veranstaltungen entdecken
  home: Nach Hause
  menuHide: Menü verstecken
  menuShow: Menü anzeigen
  profileLink: Profilseite anzeigen
  signIn: Anmelden
en:
  dashboard: Dashboard
  events: Explore events
  home: Head home
  menuHide: Hide menu
  menuShow: Show menu
  profileLink: Show profile page
  signIn: Sign in
</i18n>
