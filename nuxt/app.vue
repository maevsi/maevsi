<template>
  <div>
    <CardStateInfo is-edgy>
      <i18n-t keypath="infoEngine" tag="span">
        <template #move>
          <AppLink
            is-underlined
            :is-colored="false"
            to="https://nuxt.com/docs/migration/overview"
          >
            {{ t('infoEngineMove') }}
          </AppLink>
        </template>
        <template #tell>
          <AppLink
            is-underlined
            :is-colored="false"
            to="mailto:mail+support@maev.si"
          >
            {{ t('infoEngineTell') }}
          </AppLink>
        </template>
      </i18n-t>
    </CardStateInfo>
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
  infoEngine: Maevsi ist {move}! 🚚 Wenn etwas kaputt gegangen ist, {tell}.
  infoEngineMove: umgezogen
  infoEngineTell: sag Bescheid
en:
  browserUnsupported: Your browser version seems outdated. Some things might not work as expected or look funny.
  infoEngine: Maevsi {move}! 🚚 If something broke, {tell}.
  infoEngineMove: moved
  infoEngineTell: please tell us
</i18n>
