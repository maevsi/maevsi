export const usePlatform = () => {
  const { ssrContext } = useNuxtApp()

  const platform = ssrContext
    ? ssrContext.event.context.$platform
    : useCookie('maevsi-platform').value

  const isApp = ref<boolean | undefined>(
    platform ? ['android', 'ios'].includes(platform) : undefined,
  )

  return {
    isApp,
    platform,
  }
}
