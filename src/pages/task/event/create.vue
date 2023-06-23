<template>
  <div>
    <h1>{{ title }}</h1>
    <FormEvent v-if="store.jwtDecoded?.role === 'maevsi_account'" />
    <LayoutCallToAction
      v-else
      :call-to-action="t('anonymousCta')"
      :call-to-action-description="t('anonymousCtaDescription')"
    />
  </div>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'

const { t } = useI18n()
const store = useMaevsiStore()

// data
const title = t('title')

// initialization
useHeadDefault(title)
</script>

<i18n lang="yaml">
de:
  anonymousCta: Finde ihn auf maevsi
  anonymousCtaDescription: Du suchst einen liebevollen Ort für deine Veranstaltung?
  title: Veranstaltung erstellen
en:
  anonymousCta: Find it on maevsi
  anonymousCtaDescription: Are you looking for a loving place for your event?
  title: Create event
</i18n>
