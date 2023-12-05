<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>
      {{ title }}
    </h1>
    <div class="flex flex-col gap-8">
      <section class="flex flex-col gap-4">
        <h2>{{ t('exit') }}</h2>
        <ButtonColored :aria-label="t('sessionExit')" @click="signOut">
          {{ t('sessionExit') }}
          <template #prefix>
            <IHeroiconsOutlineLogout />
          </template>
        </ButtonColored>
      </section>
      <!-- TODO: move the following to /invitations -->
      <section class="flex flex-col gap-4">
        <h2>{{ t('codes') }}</h2>
        <ButtonEventUnlock />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbSession } from '../view/index.vue'

import { helpers } from '@typed-router'

const ROUTE_NAME = 'session-edit-id'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Bearbeiten',
      en: 'Edit',
    },
    to: helpers.path(`/session/edit/${route.params.id}`),
  }
}
</script>

<script setup lang="ts">
const { signOut } = useSignOut()
const { t, locale } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps(
    [
      usePageBreadcrumbHome(),
      usePageBreadcrumbSession(),
      {
        current: true,
        ...usePageBreadcrumb(),
      },
    ],
    locale,
  ),
)
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  codes: Einladungscodes
  exit: Beenden
  sessionExit: Diese Sitzung beenden
  title: Sitzung bearbeiten
en:
  codes: Invitation codes
  exit: Exit
  sessionExit: Exit this session
  title: Edit session
</i18n>
