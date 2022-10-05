export const useHost = () => {
  if (process.server) {
    const event = useRequestEvent()

    if (!event.req.headers.host) throw new Error('Host header is not given!')

    return event.req.headers.host
  } else {
    return location.host
  }
}
