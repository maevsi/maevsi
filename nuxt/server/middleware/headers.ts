import { appendHeader, defineEventHandler } from 'h3'

import { getHost } from '~/plugins/util/util'

function getCsp(host: string): Record<string, Array<string>> {
  const hostName = host.replace(/:[0-9]+$/, '')
  const config = useRuntimeConfig()

  return {
    'base-uri': ["'none'"], // Mozilla Observatory.
    'connect-src': [
      ...(config.public.isInDevelopment
        ? [
            `http://${hostName}:24678/_nuxt/`,
            `https://${hostName}:24678/_nuxt/`,
            `ws://${hostName}:24678/_nuxt/`,
            `wss://${hostName}:24678/_nuxt/`,
          ]
        : [
            `https://${host}/cdn-cgi/rum`, // Cloudflare real user management (browser insights)
          ]),
      "'self'",
      `https://postgraphile.${host}`,
      'https://www.google-analytics.com',
    ],
    'default-src': ["'none'"],
    'font-src': ["'self'"],
    'form-action': ["'self'"], // Mozilla Observatory: "none".
    'frame-ancestors': ["'none'"], // Mozilla Observatory.
    'img-src': [
      'blob:',
      'data:',
      `https://tusd.${host}`,
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
}

function getCspAsString(host: string): string {
  const csp = getCsp(host)
  let result = ''

  Object.keys(csp).forEach((key) => {
    result += `${key} ${csp[key].join(' ')};`
  })

  return result
}

export default defineEventHandler((event) => {
  const host = getHost(event)

  appendHeader(event, 'Content-Security-Policy', getCspAsString(host))
  // appendHeader(event, 'Cross-Origin-Embedder-Policy', 'require-corp') // https://stackoverflow.com/questions/71904052/getting-notsameoriginafterdefaultedtosameoriginbycoep-error-with-helmet
  appendHeader(event, 'Cross-Origin-Opener-Policy', 'same-origin')
  appendHeader(event, 'Cross-Origin-Resource-Policy', 'same-origin')
  // appendHeader(event, 'Expect-CT', 'max-age=0') // deprecated (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT)
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
