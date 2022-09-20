import { appendHeader, defineEventHandler } from 'h3'

import { STACK_DOMAIN } from '~/plugins/util/constants'

const csp: Record<string, Array<string>> = {
  'base-uri': ["'none'"], // Mozilla Observatory.
  'connect-src': [
    `ws://localhost:24678/_nuxt/`, // Nuxt development
    `https://${STACK_DOMAIN}/cdn-cgi/rum`, // Cloudflare real user management (browser insights)
    `https://postgraphile.${STACK_DOMAIN}`,
    'https://www.google-analytics.com',
  ],
  'default-src': ["'none'"],
  'font-src': ["'self'"],
  'form-action': ["'none'"], // Mozilla Observatory.
  'frame-ancestors': ["'none'"], // Mozilla Observatory.
  'img-src': [
    'blob:',
    'data:',
    `https://tusd.${STACK_DOMAIN}`,
    'https://www.google-analytics.com',
    'https://www.gravatar.com/avatar/',
    "'self'",
  ],
  'manifest-src': ["'self'"],
  'prefetch-src': ["'self'"],
  'report-uri': ['https://dargmuesli.report-uri.com/r/d/csp/enforce'],
  // TODO: https://stackoverflow.com/questions/62081028/this-document-requires-trustedscripturl-assignment
  // 'require-trusted-types-for': ["'script'"], // csp-evaluator // https://github.com/maevsi/maevsi/issues/830
  'script-src': [
    'blob:',
    "'self'",
    'https://static.cloudflareinsights.com',
    'https://www.google-analytics.com/analytics.js',

    "'unsafe-inline'", // https://github.com/unjs/nitro/issues/81
    "'unsafe-eval'", // https://github.com/unjs/nitro/issues/81
  ],
  'style-src': ["'self'", "'unsafe-inline'"], // Tailwind
}

function getCspAsString(): string {
  let result = ''

  Object.keys(csp).forEach((key) => {
    result += `${key} ${csp[key].join(' ')};`
  })

  return result
}

export default defineEventHandler((event) => {
  appendHeader(event, 'Content-Security-Policy', getCspAsString())
  // appendHeader(event, 'Cross-Origin-Embedder-Policy', 'require-corp') // https://stackoverflow.com/questions/71904052/getting-notsameoriginafterdefaultedtosameoriginbycoep-error-with-helmet
  appendHeader(event, 'Cross-Origin-Opener-Policy', 'same-origin')
  appendHeader(event, 'Cross-Origin-Resource-Policy', 'same-origin')
  appendHeader(event, 'Expect-CT', 'max-age=0')
  appendHeader(
    event,
    'NEL',
    '\'{"report_to":"default","max_age":31536000,"include_subdomains":true}\''
  )
  appendHeader(event, 'Origin-Agent-Cluster', '?1')
  appendHeader(event, 'Permissions-Policy', '')
  appendHeader(event, 'Referrer-Policy', 'no-referrer')
  appendHeader(
    event,
    'Report-To',
    '\'{"group":"default","max_age":31536000,"endpoints":[{"url":"https://dargmuesli.report-uri.com/a/d/g"}],"include_subdomains":true}\''
  )
  appendHeader(
    event,
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )
  appendHeader(event, 'X-Content-Type-Options', 'nosniff')
  appendHeader(event, 'X-DNS-Prefetch-Control', 'off')
  appendHeader(event, 'X-Download-Options', 'noopen')
  appendHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
  appendHeader(event, 'X-Permitted-Cross-Domain-Policies', 'none')
  appendHeader(event, 'X-XSS-Protection', '0')
})
