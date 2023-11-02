export const useIsTesting = () => {
  const cookie = useCookie(TESTING_COOKIE_NAME).value
  const runtimeConfig = useRuntimeConfig()

  return runtimeConfig.public.vio.isTesting || !!cookie
}
