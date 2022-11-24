<template>
  <div>
    <CardStateInfo v-if="!isBrowserSupported" is-edgy>
      {{ t('browserUnsupported') }}
    </CardStateInfo>
    <NuxtLayout>
      <NuxtLoadingIndicator color="#fff" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import supportedBrowsers from '~/supportedBrowsers'

const { t } = useI18n()

// data
const isBrowserSupported = ref(true)

// lifecycle
onBeforeMount(() => {
  isBrowserSupported.value = supportedBrowsers.test(navigator.userAgent)
})
</script>

<i18n lang="yaml">
de:
  browserUnsupported: Dein Browser scheint veraltet zu sein. Manche Dinge könnten deshalb nicht funktionieren oder komisch aussehen.
en:
  browserUnsupported: Your browser version seems outdated. Some things might not work as expected or look funny.
</i18n>
