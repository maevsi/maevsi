<template>
  <div>
    <CardStateInfo
      v-if="!isBrowserSupported && !runtimeConfig.public.vio.isTesting"
      is-edgy
    >
      {{ t('browserUnsupported') }}
    </CardStateInfo>
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

import { useMaevsiStore } from './store'
import supportedBrowsers from '~/supportedBrowsers'

const cookieControl = useCookieControl()
const { t, locale } = useI18n()
const store = useMaevsiStore()
const { $dayjs, $pwa } = useNuxtApp()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const siteConfig = useSiteConfig()

// data
const isBrowserSupported = ref(true)

// methods
const init = () => {
  if (process.client) {
    const cookieTimezone = useCookie(TIMEZONE_COOKIE_NAME, {
      // default: () => undefined, // setting `default` on the client side only does not write the cookie
      httpOnly: false,
      sameSite: 'strict',
      secure: runtimeConfig.public.vio.isInProduction,
    })

    // @ts-ignore `tz` should be part of `$dayjs` (https://github.com/iamkun/dayjs/issues/2106)
    cookieTimezone.value = $dayjs.tz.guess()
  }

  router.afterEach(async () => {
    while (store.routerAfterEachs.length > 0) {
      const routerAfterEach = store.routerAfterEachs.pop()

      if (!routerAfterEach) return

      await routerAfterEach()
    }
  })
}

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
    if (current.showInstallPrompt && !runtimeConfig.public.vio.isTesting) {
      const result = await showToast({
        confirmButtonText: t('pwaConfirmButtonText'),
        showConfirmButton: true,
        text: t('pwaText'),
        timer: 10000,
        title: t('pwaTitle'),
      })

      if (result.isConfirmed) {
        $pwa.install()
      } else {
        $pwa.cancelInstall()
      }
    }
  },
)

// initialization
updateSiteConfig({
  description: t('globalSeoSiteDescription'),
})
defineOgImage({
  alt: t('globalSeoOgImageAlt'),
  component: 'Default',
})
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
init()
</script>

<i18n lang="yaml">
de:
  browserUnsupported: Dein Browser scheint veraltet zu sein. Manche Dinge könnten deshalb nicht funktionieren oder komisch aussehen.
  pwaConfirmButtonText: App nutzen
  pwaText: Die Installation verbraucht fast keinen Speicherplatz und bietet eine schnelle Möglichkeit, zu dieser App zurückzukehren.
  pwaTitle: maevsi installieren
en:
  browserUnsupported: Your browser version seems outdated. Some things might not work as expected or look funny.
  pwaConfirmButtonText: Get the app
  pwaText: Installing uses almost no storage and provides a quick way to return to this app.
  pwaTitle: Install maevsi
</i18n>
