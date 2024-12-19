export const getTusdFilesUrl = ({ siteUrl }: { siteUrl: URL }) =>
  `https://tusd.${getDomainTldPort(siteUrl.host)}/files/`
