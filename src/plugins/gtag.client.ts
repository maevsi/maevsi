import VueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter()
  const cookieControl = useCookieControl()

  nuxtApp.vueApp.use(
    VueGtag,
    {
      bootstrap: !!cookieControl.cookiesEnabledIds.value?.includes('ga'),
      config: {
        id: runtimeConfig.public.vio.googleAnalyticsId,
        params: {
          cookie_flags: `samesite=strict${
            runtimeConfig.public.vio.isInProduction ? ';secure' : ''
          }`,
        },
      },
    },
    router,
  )
})
