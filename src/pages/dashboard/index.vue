<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <LayoutPageTitle :title="title" />
    <div
      v-if="store.jwtDecoded?.role === 'maevsi_account'"
      class="flex flex-col gap-8"
    >
      <section class="flex flex-col gap-4">
        <CardButton
          :description="t('eventsDescription')"
          :title="t('events')"
          :to="localePath(`/event/view/${store.signedInUsername}`)"
        >
          <IHeroiconsCalendar />
        </CardButton>
        <UnderConstruction>
          <CardButton
            :description="t('invitationsDescription')"
            :title="t('invitations')"
            :to="localePath(`/invitation`)"
          >
            <ISolarLetterLinear />
          </CardButton>
        </UnderConstruction>
        <CardButton
          :description="t('contactsDescription')"
          :title="t('contacts')"
          :to="localePath(`/contact`)"
        >
          <IHeroiconsUsers />
        </CardButton>
        <CardButton
          :description="t('uploadsDescription')"
          :title="t('uploads')"
          :to="localePath(`/upload`)"
        >
          <IHeroiconsFolder />
        </CardButton>
        <CardButton
          :description="t('accountDescription')"
          :title="t('account')"
          :to="localePath(`/account/view/${store.signedInUsername}`)"
        >
          <IHeroiconsIdentification />
        </CardButton>
      </section>
      <ButtonApp />
      <UnderConstruction>
        <section class="flex flex-col gap-4">
          <h2>{{ t('news') }}</h2>
          <LayoutFeed />
        </section>
      </UnderConstruction>
    </div>
    <LayoutCallToAction
      v-else
      :call-to-action="t('anonymousCta')"
      :call-to-action-description="t('anonymousCtaDescription')"
    />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'
import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

export const usePageBreadcrumb = () =>
  ({
    label: 'Dashboard',
    to: '/dashboard',
  }) as BreadcrumbLinkLocalized
</script>

<script setup lang="ts">
const { t } = useI18n()
const store = useMaevsiStore()
const localePath = useLocalePath()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbHome(),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  account: Konto
  accountDescription: Präsentiere deine Errungenschaften
  anonymousCta: Finde ihn auf maevsi
  anonymousCtaDescription: Dir fehlt der Überblick über Veranstaltungen?
  contacts: Kontake
  contactsDescription: Informationen zu all deinen Gästen
  events: Veranstaltungen
  eventsDescription: Organisiere deine eigenen Veranstaltungen
  invitations: Einladungen
  invitationsDescription: Sieh nach, wo du eingeladen bist
  news: Ereignisverlauf
  title: Dashboard
  uploads: Uploads
  uploadsDescription: Teile deine Dateien
en:
  account: Account
  accountDescription: Showcase your achievements
  anonymousCta: Find it on maevsi
  anonymousCtaDescription: Are you missing an overview of events?
  contacts: Contacts
  contactsDescription: Information on all your guests
  events: Events
  eventsDescription: Organize your own events
  invitations: Invitations
  invitationsDescription: See where you're invited
  news: Recent changes
  title: Dashboard
  uploads: Uploads
  uploadsDescription: Share your files
</i18n>
