<template>
  <div>
    <LayoutPageTitle :title="title" />
    <div
      v-if="store.jwtDecoded?.role === `${SITE_NAME}_account`"
      class="flex flex-col gap-8"
    >
      <section class="flex flex-col gap-4">
        <CardButton
          :description="t('eventsDescription')"
          :title="t('events')"
          :to="
            localePath({
              name: 'event-view-username',
              params: { username: store.signedInUsername },
            })
          "
        >
          <IHeroiconsCalendar />
        </CardButton>
        <UnderConstruction>
          <CardButton
            :description="t('guestsDescription')"
            :title="t('guests')"
            :to="localePath(`guest`)"
          >
            <ISolarLetterLinear />
          </CardButton>
        </UnderConstruction>
        <CardButton
          :description="t('contactsDescription')"
          :title="t('contacts')"
          :to="localePath(`contact`)"
        >
          <IHeroiconsUsers />
        </CardButton>
        <CardButton
          :description="t('uploadsDescription')"
          :title="t('uploads')"
          :to="localePath(`upload`)"
        >
          <IHeroiconsFolder />
        </CardButton>
        <CardButton
          :description="t('accountDescription')"
          :title="t('account')"
          :to="
            localePath({
              name: 'account-view-username',
              params: {
                username: store.signedInUsername,
              },
            })
          "
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
      :call-to-action="t('anonymousCta', { siteName: t('globalSiteName') })"
      :call-to-action-description="t('anonymousCtaDescription')"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const store = useStore()
const localePath = useLocalePath()

// data
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  account: Konto
  accountDescription: Präsentiere deine Errungenschaften
  anonymousCta: Finde ihn auf {siteName}
  anonymousCtaDescription: Dir fehlt der Überblick über Veranstaltungen?
  contacts: Kontake
  contactsDescription: Informationen zu all deinen Gästen
  events: Veranstaltungen
  eventsDescription: Organisiere deine eigenen Veranstaltungen
  guests: Einladungen
  guestsDescription: Sieh nach, wo du eingeladen bist
  news: Ereignisverlauf
  title: Dashboard
  uploads: Uploads
  uploadsDescription: Teile deine Dateien
en:
  account: Account
  accountDescription: Showcase your achievements
  anonymousCta: Find it on {siteName}
  anonymousCtaDescription: Are you missing an overview of events?
  contacts: Contacts
  contactsDescription: Information on all your guests
  events: Events
  eventsDescription: Organize your own events
  guests: Invitations
  guestsDescription: See where you're invited
  news: Recent changes
  title: Dashboard
  uploads: Uploads
  uploadsDescription: Share your files
</i18n>
