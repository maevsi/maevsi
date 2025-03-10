<template>
  <!-- <Loader :api="api" indicator="ping"> -->
  <header class="2xl:mb-8">
    <div class="flex items-center justify-between gap-4">
      <ButtonIcon
        v-if="
          store.routeHistory.length ||
          !isEqual(route.path, localePath('index').toString())
        "
        :aria-label="t('back')"
        @click="store.navigateBack()"
      >
        <IHeroiconsChevronLeft />
      </ButtonIcon>
      <Button
        :aria-label="t('home')"
        class="hidden 2xl:block"
        :to="localePath('index')"
      >
        <IconLogoWithText class="h-10" />
      </Button>
      <div class="hidden grow lg:block" />

      <div class="grow" />
      <div class="flex items-center gap-2 whitespace-nowrap lg:gap-4">
        <ButtonEventNew />
        <div
          class="my-1 hidden w-px flex-none self-stretch bg-gray-300 2xl:flex dark:bg-gray-600"
        />
        <ButtonIcon
          v-if="store.signedInAccountId"
          :aria-label="t('dashboard')"
          class="hidden rounded-full 2xl:block"
          :title="t('dashboard')"
          :to="localePath(`dashboard`)"
        >
          <AccountProfilePicture
            :account-id="store.signedInAccountId"
            classes="h-10 w-10"
            height="40"
            width="40"
          />
        </ButtonIcon>
        <ButtonText
          v-else
          :aria-label="t('signIn')"
          class="hidden 2xl:inline-block"
          :to="localePath('session-create')"
        >
          {{ t('signIn') }}
        </ButtonText>
        <ButtonIcon
          :aria-label="t('settings')"
          :to="
            localePath({
              name: 'session-edit-id',
              params: { id: store.jwtDecoded?.id || 'anonymous' },
            })
          "
        >
          <IHeroiconsBars3 height="2em" width="2em" />
        </ButtonIcon>
      </div>
    </div>
  </header>
  <!-- </Loader> -->
</template>

<script setup lang="ts">
import { isEqual } from 'ufo'

const store = useStore()
const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
</script>

<i18n lang="yaml">
de:
  back: zurück
  dashboard: Dashboard
  home: Nach Hause
  settings: Einstellungen
  signIn: Anmelden
en:
  back: back
  dashboard: Dashboard
  home: Head home
  settings: Settings
  signIn: Sign in
</i18n>
