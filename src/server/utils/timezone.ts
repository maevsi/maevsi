import { H3Event } from 'h3'

import { TIMEZONE_COOKIE_NAME } from '~/utils/constants'

// TODO: rename to `getTimezone` (https://github.com/nuxt/cli/issues/266)
export const getTimezoneServer = async (event: H3Event) => {
  const timezoneBySsr = event.context.$timezone

  if (timezoneBySsr) return timezoneBySsr

  const timezoneByCookie = getCookie(event, TIMEZONE_COOKIE_NAME)

  if (timezoneByCookie) return timezoneByCookie

  const ip = event.node.req.headers['x-real-ip']

  if (ip && !Array.isArray(ip)) {
    const timezoneByIpApi = await getTimezoneByIpApi(ip)

    if (timezoneByIpApi) return timezoneByIpApi
  }
}

export const getTimezoneByIpApi = async (ip: string) => {
  const ipApiResult = await $fetch<{ timezone: string }>(
    `http://ip-api.com/json/${ip}`,
  ).catch(() => {})

  if (ipApiResult) {
    return ipApiResult.timezone
  }
}
