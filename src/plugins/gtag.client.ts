import VueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const cookieControl = useCookieControl()

  nuxtApp.vueApp.use(
    VueGtag,
    {
      bootstrap: !!cookieControl.cookiesEnabledIds.value?.includes('ga'),
      config: {
        id: config.public.vio.googleAnalyticsId,
        params: {
          cookie_flags: 'secure;samesite=strict',
        },
      },
    },
    router,
  )
})
