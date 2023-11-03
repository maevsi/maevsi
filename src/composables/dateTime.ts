import type { Dayjs } from 'dayjs'

export const useDateTime = () => {
  const { $dayjs, ssrContext } = useNuxtApp()
  const timezone = ssrContext
    ? ssrContext.event.context.$timezone
    : getTimezone()

  return (dateTime?: string | number | Dayjs | Date | null) =>
    // @ts-ignore `tz` should be part of `$dayjs` (https://github.com/iamkun/dayjs/issues/2106)
    $dayjs(dateTime).tz(timezone)
}
