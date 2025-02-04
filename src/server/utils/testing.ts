import type { H3Event } from 'h3'

export const useIsTesting = () => {
  const event = useEvent()
  const runtimeConfig = useRuntimeConfig()

  return getIsTesting({ event, runtimeConfig })
}

export const getIsTesting = ({
  event,
  runtimeConfig,
}: {
  event?: H3Event
  runtimeConfig: ReturnType<typeof useRuntimeConfig>
}) => {
  const isTestingByRuntimeConfig = runtimeConfig.public.vio.isTesting

  if (isTestingByRuntimeConfig) return true

  if (event) {
    const isTestingByCookie = !!getCookie(event, TESTING_COOKIE_NAME)

    if (isTestingByCookie) return true
  }
}
