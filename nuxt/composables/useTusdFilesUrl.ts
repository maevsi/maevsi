export const useTusdFilesUrl = () => {
  const config = useRuntimeConfig()
  const host = useHost()

  return `https://tusd.${getDomainTldPort(
    config.public.stagingHost || host
  )}/files/`
}
