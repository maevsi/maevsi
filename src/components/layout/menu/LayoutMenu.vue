<template>
  <LayoutMenuItem
    :title="t('dashboard')"
    :to="localePath(store.signedInUsername ? '/dashboard' : '/')"
  >
    <IHeroiconsHome />
  </LayoutMenuItem>
  <!-- <ISolarTelescopeBold /> -->
  <LayoutMenuItem :title="t('search')" :to="localePath('/search')">
    <IHeroiconsMagnifyingGlass />
  </LayoutMenuItem>
  <!-- <IHeroiconsBell /> -->
  <UnderConstruction>
    <LayoutMenuItem
      :title="t('notifications')"
      :to="localePath('/notification')"
    >
      <div class="relative">
        <IHeroiconsHeart />
        <div class="absolute right-0 top-0">
          <NotificationIndicator />
        </div>
      </div>
    </LayoutMenuItem>
  </UnderConstruction>
  <LayoutMenuItem
    :title="t('account')"
    :to="
      localePath(
        store.signedInUsername
          ? `/account/view/${store.signedInUsername}`
          : '/session/create',
      )
    "
  >
    <IHeroiconsUser />
  </LayoutMenuItem>
</template>

<script setup lang="ts">
const store = useMaevsiStore()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
de:
  account: Konto
  dashboard: Dashboard
  notifications: Benachrichtigungen
  search: Suche
en:
  account: Account
  dashboard: Dashboard
  notifications: Notifications
  search: Search
</i18n>
