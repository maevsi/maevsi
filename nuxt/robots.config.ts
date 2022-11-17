import { IncomingMessage } from 'node:http'

import { getHost } from './utils/util'

export default {
  'user-agent': '*',
  allow: ['/'],
  // @ts-ignore Lighthouse mandates a user agent to precede allow and disallow rules.
  'user-agent': '*', // eslint-disable-line no-dupe-keys
  disallow: [
    '/robots.txt', // https://webmasters.stackexchange.com/a/117537/70856
  ],
  sitemap: (req: IncomingMessage) => {
    return `https://${getHost(req)}/sitemap.xml`
  },
}
