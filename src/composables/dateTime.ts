import type { Dayjs } from 'dayjs'

export const useDateTime = () => {
  const { $dayjs } = useNuxtApp()
  const timezone = getTimezone()

  return (dateTime?: string | number | Dayjs | Date | null) =>
    // @ts-ignore `tz` should be part of `$dayjs` (https://github.com/iamkun/dayjs/issues/2106)
    $dayjs(dateTime).tz(timezone)
}
