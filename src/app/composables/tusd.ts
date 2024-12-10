export const useTusdFilesUrl = () => {
  const runtimeConfig = useRuntimeConfig()
  const host = useHost()

  return `https://tusd.${getDomainTldPort(
    runtimeConfig.public.vio.stagingHost || host,
  )}/files/`
}
