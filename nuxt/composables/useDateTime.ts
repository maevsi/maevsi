import { Dayjs } from 'dayjs'

export const useDateTime = () => {
  const event = useRequestEvent()
  const { $dayjs } = useNuxtApp()
  const timezoneCookie = useCookie(TIMEZONE_COOKIE_NAME)

  const timezoneHeader = event?.node.req.headers[TIMEZONE_HEADER_KEY]
  const timezone =
    timezoneHeader && !Array.isArray(timezoneHeader)
      ? timezoneHeader
      : timezoneCookie.value || undefined

  return (dateTime?: string | number | Dayjs | Date | null) =>
    // @ts-ignore `tz` should be part of `$dayjs` (https://github.com/iamkun/dayjs/issues/2106)
    $dayjs(dateTime).tz(timezone)
}
