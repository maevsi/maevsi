<template>
  <div>
    <LayoutPageTitle :title="title" />
    <ContactList v-if="store.jwtDecoded?.role === 'maevsi_account'" />
    <LayoutCallToAction
      v-else
      :call-to-action="t('anonymousCta')"
      :call-to-action-description="t('anonymousCtaDescription')"
    />
  </div>
</template>

<script setup lang="ts">
const store = useMaevsiStore()
const { t } = useI18n()

// data
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  anonymousCta: Finde sie auf maevsi
  anonymousCtaDescription: Wo sind deine Freunde?
  title: Kontaktbuch
en:
  anonymousCta: Find them on maevsi
  anonymousCtaDescription: Where are your friends?
  title: Contact book
</i18n>
