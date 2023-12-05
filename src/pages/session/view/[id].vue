<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <ButtonList class="justify-center">
      <ButtonColored
        v-if="store.jwtDecoded?.id"
        :aria-label="t('edit')"
        :to="localePath(`/session/edit/${store.jwtDecoded.id}`)"
      >
        {{ t('edit') }}
        <template #prefix>
          <IHeroiconsPencil />
        </template>
      </ButtonColored>
    </ButtonList>
    <h1>
      {{ title }}
    </h1>
    <div class="flex flex-col gap-8">
      <section class="flex flex-col gap-4">
        <h2>{{ t('metadata') }}</h2>
        <p>
          {{ t('sessionExpiry', { exp: sessionExpiryTime }) }}
        </p>
      </section>
      <section class="flex flex-col gap-4">
        <h2>{{ t('userAgentString') }}</h2>
        <div>
          {{ userAgentString }}
        </div>
      </section>
      <!-- TODO: move the following to /invitations -->
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
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

import { type RoutesNamesList } from '@typed-router'

const ROUTE_NAME: RoutesNamesList = 'session-view-id'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Sitzung',
      en: 'Session',
    },
    to: `/session/view/${route.params.id}`,
  } as BreadcrumbItemPropsLocalizedObject
}
</script>

<script setup lang="ts">
const { t } = useI18n()
const requestEvent = useRequestEvent()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const store = useMaevsiStore()
const dateTime = useDateTime()
const localePath = useLocalePath()

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
const title = t('title')

// computations
const sessionExpiryTime = computed(() =>
  store.jwtDecoded?.exp
    ? dateTime(store.jwtDecoded?.exp * 1000).format('llll')
    : undefined,
)
const userAgentString = computed(() =>
  requestEvent ? requestEvent.headers.get('user-agent') : navigator.userAgent,
)

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  codes: Einladungscodes
  codesEntered: 'Du hast die folgenden Codes eingegeben:'
  codesEnteredNone: Dieser Sitzung sind keine Einladungscodes zugeordnet 😕
  edit: Bearbeiten
  metadata: Metadaten
  sessionExpiry: Deine Sitzung läuft am {exp} ab.
  title: Sitzung
  userAgentString: User agent string
en:
  codes: Invitation codes
  codesEntered: 'You entered the following codes:'
  codesEnteredNone: There are no invitation codes assigned to this session 😕
  edit: Edit
  metadata: Metadata
  sessionExpiry: Your session expires on {exp}.
  title: Session
  userAgentString: User agent string
</i18n>
