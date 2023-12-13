<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>
      {{ title }}
    </h1>
    <div
      v-if="store.jwtDecoded?.role === 'maevsi_account'"
      class="flex flex-col gap-8"
    >
      <section class="flex flex-col gap-4">
        <Button
          :aria-label="t('events')"
          class="rounded-lg text-left"
          is-block
          :to="localePath(`/event/view/${store.signedInUsername}`)"
        >
          <SessionCard
            :description="t('eventsDescription')"
            :title="t('events')"
          >
            <IHeroiconsCalendar />
          </SessionCard>
        </Button>
        <Button
          :aria-label="t('invitations')"
          class="rounded-lg text-left"
          disabled
          is-block
          :to="localePath(`/invitation`)"
        >
          <SessionCard
            :description="t('invitationsDescription')"
            :title="t('invitations')"
          >
            <ISolarLetterLinear />
          </SessionCard>
        </Button>
        <Button
          :aria-label="t('contacts')"
          class="rounded-lg text-left"
          disabled
          is-block
          :to="localePath(`/contact`)"
        >
          <SessionCard
            :description="t('contactsDescription')"
            :title="t('contacts')"
          >
            <IHeroiconsUsers />
          </SessionCard>
        </Button>
        <Button
          :aria-label="t('uploads')"
          class="rounded-lg text-left"
          disabled
          is-block
          :to="localePath(`/upload`)"
        >
          <SessionCard
            :description="t('uploadsDescription')"
            :title="t('uploads')"
          >
            <IHeroiconsFolder />
          </SessionCard>
        </Button>
      </section>
      <section class="flex flex-col gap-4">
        <h2>{{ t('news') }}</h2>
        <LayoutFeed />
      </section>
    </div>
    <LayoutCallToAction
      v-else
      :call-to-action="t('anonymousCta')"
      :call-to-action-description="t('anonymousCtaDescription')"
    />
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from './index.vue'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

export const usePageBreadcrumb = () =>
  ({
    label: 'Dashboard',
    to: '/dashboard',
  }) as BreadcrumbItemPropsLocalizedObject
</script>

<script setup lang="ts">
const { t } = useI18n()
const store = useMaevsiStore()
const localePath = useLocalePath()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

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

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
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
