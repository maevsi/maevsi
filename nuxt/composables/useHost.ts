export const useHost = () => {
  if (process.server) {
    const event = useRequestEvent()

    return getHost(event.node.req)
  } else {
    return location.host
  }
}
