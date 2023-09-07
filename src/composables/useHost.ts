export const useHost = () => {
  if (process.server) {
    const event = useRequestEvent()

    return getHost(event)
  } else {
    return location.host
  }
}
