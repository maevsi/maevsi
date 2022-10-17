import { IncomingMessage } from 'h3'

import { getHost } from './plugins/util/util'

export default {
  allow: ['/'],
  disallow: [
    '/robots.txt', // https://webmasters.stackexchange.com/a/117537/70856
  ],
  sitemap: (req: IncomingMessage) => {
    return `https://${getHost(req)}/sitemap.xml`
  },
}
