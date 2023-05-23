import isHTTPS from 'is-https'

import { getHost } from '../../utils/util'

export default defineEventHandler((event) => {
  const baseUrl = `http${isHTTPS(event.node.req) ? 's' : ''}://${getHost(
    event
  )}`

  event.node.res.setHeader('Content-Type', 'text/plain')

  return `User-agent: *
Disallow: /robots.txt
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`
})
