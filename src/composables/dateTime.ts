import type { Dayjs } from 'dayjs'

export const useDateTime = () => {
  const { $dayjs, ssrContext } = useNuxtApp()
  const timezone = ssrContext
    ? ssrContext.event.context.$timezone
    : getTimezone()

  return (dateTime?: string | number | Dayjs | Date | null) =>
    $dayjs(dateTime).tz(timezone)
}
