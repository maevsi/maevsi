<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>
      {{ title }}
    </h1>
    <div class="flex flex-col gap-8">
      <section
        v-if="store.signedInAccountId && store.signedInUsername"
        class="flex flex-col gap-4"
      >
        <h2>{{ t('friendRequests') }}</h2>
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
        <h2>{{ t('general') }}</h2>
        <div>
          <NotificationGeneral />
          <!-- <NotificationGeneral />
          <NotificationGeneral /> -->
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

export const usePageBreadcrumb = () =>
  ({
    label: {
      de: 'Benachrichtigungen',
      en: 'Notifications',
    },
    to: '/notification',
  }) as BreadcrumbItemPropsLocalizedObject
</script>

<script setup lang="ts">
const { t } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const store = useMaevsiStore()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps([
    usePageBreadcrumbHome(),
    {
      current: true,
      ...usePageBreadcrumb(),
    },
  ]),
)
const title = t('notifications')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  friendRequests: Freundschaftsanfragen
  general: Allgemein
  notifications: Benachrichtigungen
en:
  friendRequests: Friend requests
  general: General
  notifications: Notifications
</i18n>
