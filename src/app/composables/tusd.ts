export const useTusdFilesUrl = () => {
  const runtimeConfig = useRuntimeConfig()
  const host = useHost()

  return getTusdFilesUrl({ host, runtimeConfig })
}
