<template>
  <div class="relative isolate">
    <LazyClientOnly>
      <CardStateInfo
        v-if="!isBrowserSupported && !runtimeConfig.public.vio.isTesting"
        is-edgy
      >
        {{ t('browserUnsupported') }}
      </CardStateInfo>
    </LazyClientOnly>
    <NuxtLayout>
      <!-- `NuxtLayout` can't have mulitple child nodes (https://github.com/nuxt/nuxt/issues/21759) -->
      <NuxtPage />
    </NuxtLayout>
    <NuxtLoadingIndicator color="#fff" />
    <VitePwaManifest />
    <ClientOnly>
      <!-- TODO: render server side too when styling is improved (https://github.com/dargmuesli/nuxt-cookie-control/discussions/228)  -->
      <CookieControl :locale="locale" />
    </ClientOnly>
    <div
      class="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        class="clip-path aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-[15%] dark:opacity-10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@dargmuesli/nuxt-cookie-control/runtime/types'
import '@fontsource-variable/manrope'
import type { WritableComputedRef } from 'vue'

import supportedBrowsers from '~/supportedBrowsers'

const i18n = useI18n()
const { $pwa } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()
const siteConfig = useSiteConfig()
const locale = i18n.locale as WritableComputedRef<Locale>
const { t } = i18n

// data
const isBrowserSupported = ref(true)

// methods
const initialize = () => {
  if (import.meta.client) {
    saveTimezoneAsCookie()
  }
}
const saveTimezoneAsCookie = () =>
  (useCookie(TIMEZONE_COOKIE_NAME, {
    // default: () => undefined, // setting `default` on the client side only does not write the cookie
    httpOnly: false,
    sameSite: 'strict',
    secure: runtimeConfig.public.vio.isInProduction,
  }).value = getTimezone())

// lifecycle
onBeforeMount(() => {
  isBrowserSupported.value = supportedBrowsers.test(navigator.userAgent)
})
watch(
  () => $pwa,
  async (current, _previous) => {
    if (current?.showInstallPrompt && !runtimeConfig.public.vio.isTesting) {
      const result = await showToast({
        confirmButtonText: t('pwaConfirmButtonText'),
        showConfirmButton: true,
        text: t('pwaText'),
        timer: 10000,
        title: t('pwaTitle'),
      })

      if (result.isConfirmed) {
        current.install()
      } else {
        current.cancelInstall()
      }
    }
  },
)

// initialization
if (import.meta.server) {
  updateSiteConfig({
    description: t('globalSeoSiteDescription'),
  })
}
defineOgImageComponent(
  'Default',
  {
    description: t('globalSeoSiteDescription'),
  },
  {
    alt: t('globalSeoOgImageAlt'),
  },
)
useAppLayout()
useFavicons()
usePolyfills()
useSchemaOrg([
  defineWebSite({
    description: t('globalSeoSiteDescription'),
    inLanguage: locale,
    name: siteConfig.name,
  }),
  defineWebPage(),
])
useMaevsiGtag()
initialize()
</script>

<style scoped>
.clip-path {
  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  clip-path: polygon(
    73.6% 51.7%,
    91.7% 11.8%,
    100% 46.4%,
    97.4% 82.2%,
    92.5% 84.9%,
    75.7% 64%,
    55.3% 47.5%,
    46.5% 49.4%,
    45% 62.9%,
    50.3% 87.2%,
    21.3% 64.1%,
    0.1% 100%,
    5.4% 51.1%,
    21.4% 63.9%,
    58.9% 0.2%,
    73.6% 51.7%
  );
}
</style>

<i18n lang="yaml">
de:
  browserUnsupported: Du benutzt einen Browser, in dem nicht alle Funktionen von maevsi unterstützt werden.
  pwaConfirmButtonText: App nutzen
  pwaText: Die Installation verbraucht fast keinen Speicherplatz und bietet eine schnelle Möglichkeit, zu dieser App zurückzukehren.
  pwaTitle: maevsi installieren
en:
  browserUnsupported: You're using a browser which does not support all features maevsi offers.
  pwaConfirmButtonText: Get the app
  pwaText: Installing uses almost no storage and provides a quick way to return to this app.
  pwaTitle: Install maevsi
</i18n>
