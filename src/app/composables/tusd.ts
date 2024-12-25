export const useTusdFilesUrl = () => {
  const { siteUrlTyped: siteUrl } = useSiteUrl()

  return getTusdFilesUrl({ siteUrl })
}
