import type { H3Event } from 'h3'

import { TIMEZONE_COOKIE_NAME } from '~/utils/constants'

// TODO: rename to `getTimezone` (https://github.com/nuxt/cli/issues/266)
export const getTimezoneServer = async (event: H3Event) => {
  const timezoneBySsr = event.context.$timezone

  if (timezoneBySsr) return timezoneBySsr

  const timezoneByCookie = getCookie(event, TIMEZONE_COOKIE_NAME)

  if (timezoneByCookie) return timezoneByCookie

  const ip = getRequestIP(event, { xForwardedFor: true })

  if (ip) {
    const timezoneByIpApi = await getTimezoneByIpApi(ip)

    if (timezoneByIpApi) return timezoneByIpApi
  }
}

export const getTimezoneByIpApi = async (ip: string) => {
  if (isTestingServer()) return

  const ipApiResult = await $fetch<{ timezone: string }>(
    `http://geoip:8080/${ip}`,
  ).catch(() => {})

  if (ipApiResult) {
    return ipApiResult.timezone
  }
}
