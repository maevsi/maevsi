<template>
  <LayoutMenuItem
    :title="t('home')"
    :to="store.signedInUsername ? localePath('dashboard') : localePath('index')"
  >
    <IMaevsiHome :aria-label="t('iconHome')" class="h-6 w-6" />
  </LayoutMenuItem>
  <LayoutMenuItem :title="t('discover')" :to="localePath('event')">
    <IMaevsiSearch :aria-label="t('iconDiscover')" class="h-6 w-6" />
  </LayoutMenuItem>
  <LayoutMenuItem
    v-if="store.signedInUsername"
    :title="t('events')"
    :to="
      localePath({
        name: 'event-view-username',
        params: {
          username: store.signedInUsername,
        },
      })
    "
  >
    <IMaevsiToday :aria-label="t('iconEvents')" class="h-6 w-6" />
  </LayoutMenuItem>
  <LayoutMenuItem
    :title="t('account')"
    :to="
      store.signedInUsername
        ? localePath({
            name: 'account-view-username',
            params: {
              username: store.signedInUsername,
            },
          })
        : localePath('session-create')
    "
  >
    <IMaevsiAccount :aria-label="t('iconAccounts')" class="h-6 w-6" />
  </LayoutMenuItem>
  <UnderConstruction>
    <LayoutMenuItem
      :title="t('notifications')"
      :to="localePath('notification')"
    >
      <div class="relative">
        <IHeroiconsBell :aria-label="t('iconNotifications')" />
        <div class="absolute top-0 right-0">
          <NotificationIndicator />
        </div>
      </div>
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
  account: Account
  discover: Entdecken
  events: Veranstaltungen
  home: Dashboard
  iconAccounts: Icon einer Person in einem Kreis
  iconDiscover: Icon einer Lupe
  iconEvents: Icon eines Kalenders, auf dem ein Tag markiert ist
  iconHome: Icon eines Hauses
  iconNotifications: Icon einer Glocke
  notifications: Benachrichtigungen
en:
  account: Account
  discover: Discover
  events: Events
  home: Home
  iconAccounts: Icon of a person in a circle
  iconDiscover: Icon of a magnifying glass
  iconEvents: Icon of a calender on which a date is marked
  iconHome: Icon of a house
  iconNotifications: Bell icon
  notifications: Notifications
</i18n>
