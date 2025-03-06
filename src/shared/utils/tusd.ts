export const getTusdFilesUrl = ({ siteUrl }: { siteUrl: URL }) => {
  const isInFrontendDevelopment = siteUrl.port !== ''

  return `https://tusd.${
    isInFrontendDevelopment ? PRODUCTION_HOST : siteUrl.host
  }/files/`
}
