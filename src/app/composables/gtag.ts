export const useAppGtag = () => {
  const {
    gtag,
    initialize: initializeGtag,
    disableAnalytics,
    enableAnalytics,
  } = useGtag()
  const cookieControl = useCookieControl()
  const updateConsent = ({ isGranted }: { isGranted: boolean }) => {
    gtag('consent', 'update', {
      // // the following are denied per default in the gtag module configuration
      // ad_user_data: 'denied',
      // ad_personalization: 'denied',
      // ad_storage: 'denied',
      analytics_storage: isGranted ? 'granted' : 'denied',
    })
  }
  const enableGtag = () => {
    updateConsent({ isGranted: true })
    initializeGtag()
    enableAnalytics()
  }
  const disableGtag = () => {
    updateConsent({ isGranted: false })
    disableAnalytics()
  }

  if (cookieControl.cookiesEnabledIds.value?.includes(GTAG_COOKIE_ID)) {
    enableGtag()
  }

  watch(cookieControl.cookiesEnabledIds, (current, previous) => {
    if (
      !previous?.includes(GTAG_COOKIE_ID) &&
      current?.includes(GTAG_COOKIE_ID)
    ) {
      enableGtag()
    }

    if (
      previous?.includes(GTAG_COOKIE_ID) &&
      !current?.includes(GTAG_COOKIE_ID)
    ) {
      disableGtag()
    }
  })
}
