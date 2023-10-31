<template>
  <div>
    <SBreadcrumb :items="breadcrumbItems" :ui="BREADCRUMBS_UI" />
    <h1>
      {{ title }}
    </h1>
    <section class="flex flex-col gap-4">
      <h2>{{ t('session') }}</h2>
      <p v-if="sessionExpiryTime !== 'Invalid date'">
        {{ t('sessionExpiry', { exp: sessionExpiryTime }) }}
      </p>
      <p v-else>
        {{ t('sessionExpired') }}
      </p>
      <ButtonColored :aria-label="t('sessionExit')" @click="signOut">
        {{ t('sessionExit') }}
        <template #prefix>
          <IconSignOut />
        </template>
      </ButtonColored>
    </section>
    <section class="flex flex-col gap-4">
      <h2>{{ t('codes') }}</h2>
      <div v-if="store.jwtDecoded?.invitations">
        <p>
          {{ t('codesEntered') }}
        </p>
        <ul class="list-disc">
          <li
            v-for="invitationId in store.jwtDecoded?.invitations"
            :key="invitationId"
          >
            {{ invitationId }}
          </li>
        </ul>
      </div>
      <p v-else>
        {{ t('codesEnteredNone') }}
      </p>
      <ButtonEventUnlock />
    </section>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbDashboard } from '../index.vue'

import { useMaevsiStore } from '~/store'

export const usePageBreadcrumb = () => ({
  label: {
    de: 'Einstellungen',
    en: 'Settings',
  },
  to: '/dashboard/dev',
})
</script>

<script setup lang="ts">
const { signOut } = useSignOut()
const { t, locale } = useI18n()
const store = useMaevsiStore()
const dateTime = useDateTime()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps(
    [
      usePageBreadcrumbHome(),
      usePageBreadcrumbDashboard(),
      {
        current: true,
        ...usePageBreadcrumb(),
      },
    ],
    locale,
  ),
)
const title = t('title')

// computations
const sessionExpiryTime = computed(() =>
  dateTime(store.jwtDecoded?.exp).format('llll'),
)

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  codes: Einladungscodes
  codesEntered: 'Du hast die folgenden Codes eingegeben:'
  codesEnteredNone: Du hast bisher keine Codes eingegeben 😕
  session: Sitzung
  sessionExit: Diese Sitzung beenden
  sessionExpired: Deine Sitzung ist abgelaufen.
  sessionExpiry: Deine Sitzung läuft am {exp} ab.
  title: Einstellungen
en:
  codes: Invitation codes
  codesEntered: 'You entered the following codes:'
  codesEnteredNone: You have not entered any codes yet 😕
  session: session
  sessionExit: Exit this session
  sessionExpired: Your session expired.
  sessionExpiry: Your session expires on {exp}.
  title: Settings
</i18n>
