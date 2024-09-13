import { defu } from 'defu'
import type { H3Event } from 'h3'

import { getDomainTldPort, getHost } from '~/utils/networking'

const getCsp = (host: string) => {
  const hostName = host.replace(/:[0-9]+$/, '')
  const runtimeConfig = useRuntimeConfig()

  const stagingHostOrHost = runtimeConfig.public.vio.stagingHost || host

  const base = {
    'base-uri': ["'none'"], // Mozilla Observatory.
    'connect-src': [
      "'self'",
      'blob:', // vue-advanced-cropper
      `https://${getDomainTldPort(stagingHostOrHost)}`, // `/api` requests
      `https://postgraphile.${getDomainTldPort(stagingHostOrHost)}`, // backend requests
      `https://tusd.${getDomainTldPort(stagingHostOrHost)}`, // image upload requests
      'https://*.analytics.google.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://*.google-analytics.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://*.googletagmanager.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      `https://${runtimeConfig.public.sentry.host}/api/${runtimeConfig.public.sentry.project.client.id}/envelope/`, // Sentry
    ],
    'default-src': ["'none'"],
    'font-src': ["'self'", 'data:'], // @fontsource/manrope
    'form-action': ["'self'"], // Mozilla Observatory: "none".
    'frame-ancestors': ["'none'"], // Mozilla Observatory.
    'frame-src': ['https://challenges.cloudflare.com'], // Cloudflare Turnstile
    'img-src': [
      "'self'",
      'blob:',
      'data:',
      `https://tusd.${getDomainTldPort(stagingHostOrHost)}`,
      'https://*.google-analytics.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://*.googletagmanager.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://www.gravatar.com/avatar/', // profile picture fallback
    ],
    'manifest-src': ["'self'"],
    'media-src': ["'none'"],
    'object-src': ["'none'"],
    'prefetch-src': ["'self'"],
    'report-uri': ['https://dargmuesli.report-uri.com/r/d/csp/enforce'],
    // TODO: evaluate header (https://github.com/maevsi/maevsi/issues/830) // https://stackoverflow.com/questions/62081028/this-document-requires-trustedscripturl-assignment
    // 'require-trusted-types-for': ["'script'"], // csp-evaluator
    'script-src': [
      'blob:',
      "'self'",
      'https://challenges.cloudflare.com', // Cloudflare Turnstile
      'https://static.cloudflareinsights.com', // Cloudflare analytics
      'https://*.googletagmanager.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js', // ESLint plugin compat
      "'unsafe-inline'", // https://github.com/unjs/nitro/issues/81
      "'unsafe-eval'", // https://github.com/unjs/nitro/issues/81
    ],
    'style-src': ["'self'", "'unsafe-inline'"], // Tailwind
  }

  const development = {
    'connect-src': [
      `http://${hostName}:24678/_nuxt/`,
      `https://${hostName}:24678/_nuxt/`,
      `ws://${hostName}:24678/_nuxt/`,
      `wss://${hostName}:24678/_nuxt/`,
    ],
    'font-src': ['https://fonts.gstatic.com/s/inter/v12/'], // nuxt-og-image
    'frame-ancestors': ["'self'"], // nuxt-og-image
    'frame-src': [
      "'self'", // Nuxt devtools
    ],
    'script-src': ['https://cdn.tailwindcss.com/'], // nuxt-og-image
    'style-src': [
      'https://cdn.jsdelivr.net/npm/gardevoir https://fonts.googleapis.com/css2',
    ], // nuxt-og-image
  }

  const production = {
    'connect-src': [`https://${stagingHostOrHost}/cdn-cgi/rum`],
  }

  return defu(
    base,
    runtimeConfig.public.vio.isInProduction ? production : development,
  ) as Record<string, Array<string>>
}

export const getCspAsString = (event: H3Event) => {
  const host = getHost(event)
  const csp = getCsp(host)

  return Object.keys(csp).reduce((p, c) => `${p}${c} ${csp[c].join(' ')};`, '')
}
