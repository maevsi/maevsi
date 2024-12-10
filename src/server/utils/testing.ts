import type { H3Event } from 'h3'

export const isTestingServer = (event?: H3Event) => {
  const isTestingByRuntimeConfig = useRuntimeConfig().public.vio.isTesting

  if (isTestingByRuntimeConfig) return true

  if (event) {
    const isTestingByCookie = !!getCookie(event, TESTING_COOKIE_NAME)

    if (isTestingByCookie) return true
  }
}
