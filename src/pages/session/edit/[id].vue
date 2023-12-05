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
    </div>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbSession } from '../view/[id].vue'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

import { type RoutesNamesList } from '@typed-router'

const ROUTE_NAME: RoutesNamesList = 'session-edit-id'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Bearbeiten',
      en: 'Edit',
    },
    to: `/session/edit/${route.params.id}`,
  } as BreadcrumbItemPropsLocalizedObject
}
</script>

<script setup lang="ts">
const { signOut } = useSignOut()
const { t } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps([
    usePageBreadcrumbHome(),
    usePageBreadcrumbSession(),
    {
      current: true,
      ...usePageBreadcrumb(),
    },
  ]),
)
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  exit: Beenden
  sessionExit: Diese Sitzung beenden
  title: Sitzung bearbeiten
en:
  exit: Exit
  sessionExit: Exit this session
  title: Edit session
</i18n>
