export const useHost = () => {
  const event = useEvent()
  const host = getHost(event)

  if (!host) throw new Error('Host is not given!')

  return host
}
