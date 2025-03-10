<template>
  <footer class="mt-auto py-8">
    <div class="mx-auto flex flex-row justify-center gap-x-20">
      <AppLink :to="localePath('legal-notice')" :is-colored="true">
        {{ t('terms') }}
      </AppLink>

      <AppLink :to="localePath('index')" :is-colored="true">
        {{ t('imprint') }}
      </AppLink>

      <AppLink :to="localePath('privacy-policy')" :is-colored="true">
        {{ t('policy') }}
      </AppLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
de:
  terms: Bedingungen
  imprint: Impressum
  policy: Datenschutzrichtlinie
en:
  terms: Terms
  imprint: Imprint
  policy: Policy
</i18n>
