export const useTusdFilesUrl = () => {
  const config = useRuntimeConfig()
  const host = useHost()

  return `https://tusd.${config.public.stagingHost || host}/files/`
}
