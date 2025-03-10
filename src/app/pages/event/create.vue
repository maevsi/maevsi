<template>
  <div>
    <LayoutPageTitle :is-button-event-create-shown="false" :title="title" />
    <FormEvent v-if="store.jwtDecoded?.role === `${SITE_NAME}_account`" />
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

// data
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  anonymousCta: Finde ihn auf {siteName}
  anonymousCtaDescription: Du suchst einen liebevollen Ort für deine Veranstaltung?
  title: Veranstaltung erstellen
en:
  anonymousCta: Find it on {siteName}
  anonymousCtaDescription: Are you looking for a loving place for your event?
  title: Create event
</i18n>
