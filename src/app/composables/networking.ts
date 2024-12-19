export const useHost = () => {
  const { ssrContext } = useNuxtApp()
  const host = ssrContext ? getHost(ssrContext.event) : location.host

  if (!host) throw new Error('Host is not given!')

  return host
}
