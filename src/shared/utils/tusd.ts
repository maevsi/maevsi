import { IS_IN_FRONTEND_DEVELOPMENT, PRODUCTION_HOST } from './constants'

export const getTusdFilesUrl = ({ siteUrl }: { siteUrl: URL }) =>
  `https://tusd.${
    IS_IN_FRONTEND_DEVELOPMENT ? PRODUCTION_HOST : getSiteAndPort(siteUrl.host)
  }/files/`
