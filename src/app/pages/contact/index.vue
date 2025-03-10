<template>
  <div>
    <LayoutPageTitle :title="title" />
    <ContactList v-if="store.jwtDecoded?.role === `${SITE_NAME}_account`" />
    <LayoutCallToAction
      v-else
      :call-to-action="t('anonymousCta', { siteName: t('globalSiteName') })"
      :call-to-action-description="t('anonymousCtaDescription')"
    />
  </div>
</template>

<script setup lang="ts">
const store = useStore()
const { t } = useI18n()

// data
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  anonymousCta: Finde sie auf {siteName}
  anonymousCtaDescription: Wo sind deine Freunde?
  title: Kontaktbuch
en:
  anonymousCta: Find them on {siteName}
  anonymousCtaDescription: Where are your friends?
  title: Contact book
</i18n>
