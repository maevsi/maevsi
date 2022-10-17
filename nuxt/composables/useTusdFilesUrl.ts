export const useTusdFilesUrl = () => {
  const host = useHost()

  return `https://tusd.${host}/files/`
}
