<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import '@fontsource-variable/manrope'

import supportedBrowsers from '~/supportedBrowsers'

const cookieControl = useCookieControl()
const { t, locale } = useI18n()
const store = useMaevsiStore()
const { $pwa } = useNuxtApp()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const siteConfig = useSiteConfig()

// data
const isBrowserSupported = ref(true)

// methods
const initialize = () => {
  initializeAfterNavigationTaskRunner()

  if (process.client) {
    saveTimezoneAsCookie()
  }
}
const initializeAfterNavigationTaskRunner = () =>
  router.afterEach(async () => {
    while (store.routerAfterEachs.length > 0) {
      const routerAfterEach = store.routerAfterEachs.pop()

      if (!routerAfterEach) return

      await routerAfterEach()
    }
  })
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
  () => cookieControl.cookiesEnabledIds.value,
  (current, previous) => {
    if (
      (!previous?.includes('ga') && current?.includes('ga')) ||
      (previous?.includes('ga') && !current?.includes('ga'))
    ) {
      window.location.reload()
    }
  },
  { deep: true },
)
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
updateSiteConfig({
  description: t('globalSeoSiteDescription'),
})
defineOgImageComponent(
  'Default',
  {},
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
initialize()
</script>

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
