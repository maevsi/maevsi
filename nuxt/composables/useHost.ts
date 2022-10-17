import { getHost } from '~/plugins/util/util'

export const useHost = () => {
  if (process.server) {
    const event = useRequestEvent()

    return getHost(event.req)
  } else {
    return location.host
  }
}
