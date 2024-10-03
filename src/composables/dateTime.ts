import type { Dayjs } from 'dayjs'

export const useDateTime = () => {
  const { $dayjs } = useNuxtApp()
  const timezone = getTimezone()

  return (dateTime?: string | number | Dayjs | Date | null) =>
    $dayjs(dateTime).tz(timezone)
}
