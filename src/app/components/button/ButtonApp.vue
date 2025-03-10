<template>
  <Button
    v-if="!isApp"
    :aria-label="t('appInstall', { siteName: t('globalSiteName') })"
    :is-primary="false"
    :to="localePath('docs-app')"
  >
    {{ t('appInstall', { siteName: t('globalSiteName') }) }}
    <template #suffix>
      <IHeroiconsArrowRight />
    </template>
  </Button>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { isApp } = usePlatform()
</script>

<i18n lang="yaml">
de:
  appInstall: '{siteName}-App installieren, um nichts zu verpassen'
en:
  appInstall: Install the {siteName} app, don't miss any news
</i18n>
