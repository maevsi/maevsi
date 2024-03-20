export const useMaevsiGtag = () => {
  const {
    gtag,
    initialize: initializeGtag,
    disableAnalytics,
    enableAnalytics,
  } = useGtag()
  const cookieControl = useCookieControl()

  if (cookieControl.cookiesEnabledIds.value?.includes(GTAG_COOKIE_ID)) {
    initializeGtag()
  }

  watch(cookieControl.cookiesEnabledIds, (current, previous) => {
    if (
      !previous?.includes(GTAG_COOKIE_ID) &&
      current?.includes(GTAG_COOKIE_ID)
    ) {
      initializeGtag()
      enableAnalytics()
      gtag('consent', 'update', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
    }

    if (
      previous?.includes(GTAG_COOKIE_ID) &&
      !current?.includes(GTAG_COOKIE_ID)
    ) {
      disableAnalytics()
    }
  })
}
