export const useHost = () => {
  const { ssrContext } = useNuxtApp()

  if (ssrContext) {
    return getHost(ssrContext.event)
  } else {
    return location.host
  }
}
