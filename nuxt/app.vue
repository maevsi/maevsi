<template>
  <div>
    <CardStateInfo
      v-if="!isBrowserSupported && !config.public.isTesting"
      is-edgy
    >
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

const { $dayjs } = useNuxtApp()
const { t } = useI18n()
const config = useRuntimeConfig()
const cookieControl = useCookieControl()

// data
const isBrowserSupported = ref(true)

// methods
const init = () => {
  if (process.client) {
    const cookieTimezone = useCookie(TIMEZONE_COOKIE_NAME, {
      // default: () => undefined, // setting `default` on the client side only does not write the cookie
      httpOnly: false,
      sameSite: 'strict',
      secure: true,
    })

    // @ts-ignore `tz` should be part of `$dayjs` (https://github.com/iamkun/dayjs/issues/2106)
    cookieTimezone.value = $dayjs.tz.guess()
  }
}

// lifecycle
onBeforeMount(() => {
  isBrowserSupported.value = supportedBrowsers.test(navigator.userAgent)
})
watch(
  () => cookieControl.cookiesEnabledIds.value,
  (current, previous) => {
    if (
      (!previous?.includes('google-analytics') &&
        current?.includes('google-analytics')) ||
      (previous?.includes('google-analytics') &&
        !current?.includes('google-analytics'))
    ) {
      window.location.reload()
    }
  },
  { deep: true }
)

// initialization
init()
</script>

<i18n lang="yaml">
de:
  browserUnsupported: Dein Browser scheint veraltet zu sein. Manche Dinge könnten deshalb nicht funktionieren oder komisch aussehen.
en:
  browserUnsupported: Your browser version seems outdated. Some things might not work as expected or look funny.
</i18n>
