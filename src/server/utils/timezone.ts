import { H3Event } from 'h3'

import { TIMEZONE_COOKIE_NAME } from '~/utils/constants'

export const getTimezone = async (event: H3Event) =>
  event.context.$timezone ||
  getCookie(event, TIMEZONE_COOKIE_NAME) ||
  (event.node.req.headers['x-real-ip'] &&
    !Array.isArray(event.node.req.headers['x-real-ip']))
    ? await getTimezoneByIpApi(event.node.req.headers['x-real-ip'] as string)
    : undefined

export const getTimezoneByIpApi = async (ip: string) => {
  const ipApiResult = await $fetch<{ timezone: string }>(
    `http://ip-api.com/json/${ip}`,
  ).catch(() => {})

  if (ipApiResult) {
    return ipApiResult.timezone
  }
}
