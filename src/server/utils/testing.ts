import type { H3Event } from 'h3'
import { TESTING_COOKIE_NAME } from '~/shared/utils/constants'

export const isTestingServer = (event?: H3Event) => {
  const isTestingByRuntimeConfig = useRuntimeConfig().public.vio.isTesting

  if (isTestingByRuntimeConfig) return true

  if (event) {
    const isTestingByCookie = !!getCookie(event, TESTING_COOKIE_NAME)

    if (isTestingByCookie) return true
  }
}
