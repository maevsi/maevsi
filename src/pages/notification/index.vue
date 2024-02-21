<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <LayoutPageTitle :title="title" />
    <div class="flex flex-col gap-8">
      <section
        v-if="store.signedInAccountId && store.signedInUsername"
        class="flex flex-col gap-4"
      >
        <FormInputStateInfo>
          {{ t('example') }}
        </FormInputStateInfo>
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
      <ButtonApp />
    </div>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'
import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

export const usePageBreadcrumb = () =>
  ({
    label: {
      de: 'Benachrichtigungen',
      en: 'Notifications',
    },
    to: '/notification',
  }) satisfies BreadcrumbLinkLocalized
</script>

<script setup lang="ts">
const { t } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const store = useMaevsiStore()

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbHome(),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])
const title = t('notifications')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  # friendRequests: Freundschaftsanfragen
  # general: Allgemein
  example: Beispielhafte Darstellung
  notifications: Benachrichtigungen
en:
  # friendRequests: Friend requests
  # general: General
  example: Exemplary representation
  notifications: Notifications
</i18n>
