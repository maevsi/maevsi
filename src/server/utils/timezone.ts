import type { H3Event } from 'h3'

const getTimezone = async ({
  event,
  isTesting,
}: {
  event: H3Event
  isTesting?: boolean
}) => {
  const timezoneBySsr = event.context.$timezone

  if (timezoneBySsr) return timezoneBySsr

  const timezoneByCookie = getCookie(event, TIMEZONE_COOKIE_NAME)

  if (timezoneByCookie) return timezoneByCookie

  if (!isTesting) {
    const ip = getRequestIP(event, { xForwardedFor: true })

    if (ip) {
      const timezoneByIpApi = await getTimezoneByIpApi({ ip })

      if (timezoneByIpApi) return timezoneByIpApi
    }
  }
}

export const useTimezone = async () => {
  const event = useEvent()
  const isTesting = useIsTesting()

  return await getTimezone({ event, isTesting })
}

export const getTimezoneByIpApi = async ({ ip }: { ip: string }) => {
  const ipApiResult = await $fetch<{ timezone: string }>(
    `http://geoip:8080/${ip}`,
  ).catch(() => {})

  if (ipApiResult) {
    return ipApiResult.timezone
  }
}
