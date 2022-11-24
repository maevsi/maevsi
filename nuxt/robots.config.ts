import { IncomingMessage } from 'node:http'

import { getHost } from './utils/util'

export default {
  'user-agent': '*', // must come before allow and disallow rules for Lighthouse check to pass
  allow: ['/'],
  disallow: [
    '/robots.txt', // https://webmasters.stackexchange.com/a/117537/70856
  ],
  sitemap: (req: IncomingMessage) => {
    return `https://${getHost(req)}/sitemap.xml`
  },
}
