import { defu } from 'defu'
import type { RuntimeConfig } from 'nuxt/schema'

import {
  IS_NITRO_OPENAPI_ENABLED,
  STAGING_HOST as PRODUCTION_HOST,
} from '../../utils/constants'
import { getDomainTldPort as getSiteAndPort } from '../../utils/networking'

export const IS_IN_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_IN_STACK = !!process.env.NUXT_PUBLIC_SITE_URL
export const IS_IN_FRONTEND_DEVELOPMENT = !IS_IN_PRODUCTION && !IS_IN_STACK

export const GET_CSP = ({
  siteUrl,
  runtimeConfig,
}: {
  siteUrl: URL
  runtimeConfig?: RuntimeConfig
}) => {
  const domainTldPort = IS_IN_FRONTEND_DEVELOPMENT
    ? PRODUCTION_HOST
    : getSiteAndPort(siteUrl.host)

  return defu(
    // if (isHttps(event.node.req)) {
    //   appendHeader(event, 'Cross-Origin-Opener-Policy', 'same-origin')
    //   appendHeader(event, 'Origin-Agent-Cluster', '?1')
    // }
    {
      // maevsi
      'connect-src': [
        'blob:', // vue-advanced-cropper
        // `https://${domainTldPort}`, // `/api` requests
        `https://postgraphile.${domainTldPort}`, // backend requests
        `https://tusd.${domainTldPort}`, // image upload requests
      ],
      'font-src': ["'self'", 'data:'], // @fontsource/manrope
      'form-action': ["'self'"], // forms
      'img-src': [
        'blob:',
        `https://tusd.${domainTldPort}`, // users' image uploads
        'https://www.gravatar.com/avatar/', // profile picture fallback
      ],
      // 'manifest-src': ["'self'"],
      // 'prefetch-src': ["'self'"],
      'script-src-elem': [
        // 'blob:', // TODO: check source
        // "'unsafe-eval'", // TODO: check source
        'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js', // ESLint plugin compat
      ],
      ...(process.env.NODE_ENV === 'development'
        ? {
            'worker-src': [
              `${siteUrl}dev-sw.js`, // @vite-pwa/nuxt
            ],
          }
        : {}),
    },
    // {
    //   // vio
    //   'connect-src': ["'self'"], // `${SITE_URL}/api/healthcheck`
    //   'manifest-src': [`${siteUrl}site.webmanifest`],
    // },
    {
      // Cloudflare
      ...(process.env.NODE_ENV === 'production'
        ? {
            'connect-src': ['https://cloudflareinsights.com'], // analytics
            'script-src-elem': [
              'https://static.cloudflareinsights.com', // analytics
              `${siteUrl}cdn-cgi/scripts/`, // email obfuscation
              `${siteUrl}cdn-cgi/rum`,
            ],
          }
        : {}),
    },
    {
      // Cloudflare Turnstile
      'frame-src': ['https://challenges.cloudflare.com'],
      'script-src-elem': ['https://challenges.cloudflare.com'],
    },
    {
      // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'connect-src': [
        'https://*.analytics.google.com',
        'https://*.google-analytics.com',
        'https://*.googletagmanager.com',
      ],
      'img-src': [
        'https://*.google-analytics.com',
        'https://*.googletagmanager.com',
      ],
      'script-src-elem': ['https://*.googletagmanager.com'],
    },
    // {
    //   // nuxt-link-checker
    //   ...(process.env.NODE_ENV === 'development'
    //     ? {
    //         'connect-src': [`${siteUrl}api/__link_checker__/inspect`],
    //       }
    //     : {}),
    // },
    {
      // nuxt-og-image
      ...(process.env.NODE_ENV === 'development'
        ? {
            // 'connect-src': [`${siteUrl}__og-image__/`],
            'frame-ancestors': ["'self'"],
          }
        : {}),
    },
    // {
    //   // nuxt-schema-org
    //   ...(process.env.NODE_ENV === 'development'
    //     ? {
    //         'connect-src': [`${siteUrl}__schema-org__/debug.json`],
    //       }
    //     : {}),
    // },
    // {
    //   // nuxt-simple-robots
    //   ...(process.env.NODE_ENV === 'development'
    //     ? {
    //         'connect-src': [
    //           `${siteUrl}__robots__/debug.json`,
    //           `${siteUrl}__robots__/debug-path.json`,
    //         ],
    //       }
    //     : {}),
    // },
    // {
    //   // nuxt-simple-sitemap
    //   'script-src-elem': [`${SITE_URL}/__sitemap__/style.xsl`],
    //   ...(process.env.NODE_ENV === 'development'
    //     ? {
    //         'connect-src': [`${siteUrl}__sitemap__/debug.json`],
    //       }
    //     : {}),
    // },
    // {
    //   // nuxt-site-config
    //   ...(process.env.NODE_ENV === 'development'
    //     ? {
    //         'connect-src': [`${siteUrl}__site-config__/debug.json`],
    //       }
    //     : {}),
    // },
    // sentry
    {
      'connect-src': [
        ...(runtimeConfig
          ? [
              `https://${runtimeConfig.public.sentry.host}/api/${runtimeConfig.public.sentry.project.client.id}/envelope/`,
            ]
          : []),
      ],
    },
    {
      // nuxt
      ...(process.env.NODE_ENV === 'development'
        ? {
            'frame-src': [`${siteUrl}__nuxt_devtools__/client/`], // devtools
          }
        : {}),
      'connect-src': [
        "'self'", // e.g. `/_nuxt/builds/meta/`, `/_payload.json`, `/privacy-policy/_payload.json`
        // ...(process.env.NODE_ENV === 'development'
        //   ? [
        //       `http://${domainTldPort}/_nuxt/`, // hot reload
        //       `https://${domainTldPort}/_nuxt/`, // hot reload
        //       `ws://${domainTldPort}/_nuxt/`, // hot reload
        //       `wss://${domainTldPort}/_nuxt/`, // hot reload
        //     ]
        //   : []),
      ],
      'img-src': [
        "'self'", // e.g. favicon
        'data:', // external link icon
      ],
      'script-src-elem': [
        "'nonce-{{nonce}}'",
        `${siteUrl}_nuxt/`, // bundle
      ],
      'style-src': [
        "'self'", // TODO: `${siteUrl}_nuxt/`, // bundle
        "'unsafe-inline'", // TODO: replace with "'nonce-{{nonce}}'" once Sweetalert supports it (+ https://github.com/unjs/nitro/issues/81)
        // "'unsafe-eval'", // https://github.com/unjs/nitro/issues/81
      ], // TODO: use `style-src-elem` once Playwright WebKit supports it
    },
    {
      // nitro
      ...(IS_NITRO_OPENAPI_ENABLED
        ? {
            // // TODO: find out why nuxt-security does not apply here
            // 'connect-src': ["'self'"] /* swagger
            // `${siteUrl}_nitro/openapi.json`,
            // `${siteUrl}_nitro/swagger`, */,
            // 'script-src-elem': [
            //   'https://cdn.jsdelivr.net/npm/', // swagger // TODO: increase precision (https://github.com/unjs/nitro/issues/1757)
            // ],
            // 'style-src': [
            //   'https://cdn.jsdelivr.net/npm/', // swagger // TODO: increase precision (https://github.com/unjs/nitro/issues/1757)
            // ],
          }
        : {}),
    },
  )
}
