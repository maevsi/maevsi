<template>
  <LayoutMenuItem :title="t('explore')" :to="localePath('event')">
    <IHeroiconsHeart />
  </LayoutMenuItem>
  <LayoutMenuItem
    :title="t('account')"
    :to="localePath(store.signedInUsername ? `dashboard` : 'session-create')"
  >
    <AccountProfilePicture
      v-if="store.signedInUsername && store.signedInAccountId"
      :account-id="store.signedInAccountId"
      classes="rounded-full"
      height="24"
      width="24"
    />
    <IHeroiconsUser v-else />
  </LayoutMenuItem>
  <UnderConstruction>
    <LayoutMenuItem
      :title="t('notifications')"
      :to="localePath('notification')"
    >
      <div class="relative">
        <IHeroiconsBell />
        <div class="absolute right-0 top-0">
          <NotificationIndicator />
        </div>
      </div>
    </LayoutMenuItem>
  </UnderConstruction>
  <UnderConstruction>
    <LayoutMenuItem :title="t('search')" :to="localePath('search')">
      <IHeroiconsMagnifyingGlass />
    </LayoutMenuItem>
  </UnderConstruction>
</template>

<script setup lang="ts">
const store = useMaevsiStore()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
de:
  account: Dashboard
  explore: Empfehlungen
  notifications: Benachrichtigungen
  search: Suche
en:
  account: Dashboard
  explore: Suggestions
  notifications: Notifications
  search: Search
</i18n>
