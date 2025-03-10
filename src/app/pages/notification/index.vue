<template>
  <div>
    <LayoutPageTitle :title="title" />
    <div class="flex flex-col gap-8">
      <UnderConstruction>
        <div class="flex flex-col gap-8">
          <section
            v-if="store.signedInAccountId && store.signedInUsername"
            class="flex flex-col gap-4"
          >
            <!-- <h2>{{ t('friendRequests') }}</h2> -->
            <div>
              <NotificationFriendRequest
                :account-id="store.signedInAccountId"
                :username="store.signedInUsername"
              />
              <!-- <NotificationFriendRequest
              :account-id="store.signedInAccountId"
              :username="store.signedInUsername"
            />
            <NotificationFriendRequest
              :account-id="store.signedInAccountId"
              :username="store.signedInUsername"
            /> -->
            </div>
          </section>
          <section class="flex flex-col gap-4">
            <!-- <h2>{{ t('general') }}</h2> -->
            <div class="flex flex-col gap-2">
              <NotificationGeneral />
              <NotificationGeneral2 />
              <!-- <NotificationGeneral /> -->
            </div>
          </section>
        </div>
      </UnderConstruction>
      <ButtonApp />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const store = useStore()

// data
const title = t('notifications')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  # friendRequests: Freundschaftsanfragen
  # general: Allgemein
  notifications: Benachrichtigungen
en:
  # friendRequests: Friend requests
  # general: General
  notifications: Notifications
</i18n>
