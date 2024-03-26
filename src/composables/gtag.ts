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
      gtag('consent', 'update', {
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'granted',
      })
      initializeGtag()
      enableAnalytics()
    }

    if (
      previous?.includes(GTAG_COOKIE_ID) &&
      !current?.includes(GTAG_COOKIE_ID)
    ) {
      disableAnalytics()
    }
  })
}
