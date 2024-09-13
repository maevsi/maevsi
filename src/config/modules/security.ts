import type { DefineNuxtConfig } from 'nuxt/config'

export const securityConfig: ReturnType<DefineNuxtConfig> = {
  security: {
    headers: {
      contentSecurityPolicy: false,
      // if (isHttps(event.node.req)) {
      //   appendHeader(event, 'Cross-Origin-Opener-Policy', 'same-origin')
      //   appendHeader(event, 'Origin-Agent-Cluster', '?1')
      // }
      // contentSecurityPolicy: defu(
      //   {
      //     // Cloudflare
      //     ...(process.env.NODE_ENV === 'production'
      //       ? {
      //           'connect-src': ["'self'"], // `${SITE_URL}/cdn-cgi/rum`
      //           'script-src-elem': ['https://static.cloudflareinsights.com'],
      //         }
      //       : {}),
      //   },
      //   {
      //     // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      //     'connect-src': [
      //       'https://*.analytics.google.com',
      //       'https://*.google-analytics.com',
      //       'https://*.googletagmanager.com',
      //     ],
      //     'img-src': [
      //       'https://*.google-analytics.com',
      //       'https://*.googletagmanager.com',
      //     ],
      //     'script-src-elem': ['https://*.googletagmanager.com'],
      //   },
      //   {
      //     // vio
      //     'connect-src': ["'self'"], // `${SITE_URL}/api/healthcheck`
      //     'manifest-src': [`${SITE_URL}/site.webmanifest`],
      //     'script-src-elem': [
      //       'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js', // ESLint plugin compat
      //     ],
      //   },
      //   {
      //     // @nuxt/devtools
      //     ...(process.env.NODE_ENV === 'development'
      //       ? {
      //           'frame-src': [
      //             'http://localhost:3000/__nuxt_devtools__/client/',
      //           ],
      //         }
      //       : {}),
      //   },
      //   {
      //     // nuxt-link-checker
      //     ...(process.env.NODE_ENV === 'development'
      //       ? {
      //           'connect-src': ["'self'"], // 'http://localhost:3000/api/__link_checker__/inspect'
      //         }
      //       : {}),
      //   },
      //   {
      //     // nuxt-og-image
      //     ...(process.env.NODE_ENV === 'development'
      //       ? {
      //           'font-src': ['https://fonts.gstatic.com/s/inter/'],
      //           'frame-ancestors': ["'self'"],
      //           'frame-src': ["'self'"],
      //           'script-src-elem': ['https://cdn.tailwindcss.com/'],
      //           'style-src': [
      //             // TODO: replace with `style-src-elem` once Webkit supports it
      //             'https://cdn.jsdelivr.net/npm/gardevoir https://fonts.googleapis.com/css2',
      //           ],
      //         }
      //       : {}),
      //   },
      //   {
      //     // nuxt-simple-sitemap
      //     'script-src-elem': [`${SITE_URL}/__sitemap__/style.xsl`],
      //   },
      //   {
      //     // nuxt
      //     'connect-src': [
      //       ...(process.env.NODE_ENV === 'development'
      //         ? [
      //             'http://localhost:3000/_nuxt/', // hot reload
      //             'https://localhost:3000/_nuxt/', // hot reload
      //             'ws://localhost:3000/_nuxt/', // hot reload
      //             'wss://localhost:3000/_nuxt/', // hot reload
      //           ]
      //         : ["'self'"]), // build metadata and payloads
      //     ],
      //     'img-src': [
      //       "'self'", // TODO: replace with `"'nonce-{{nonce}}'",`
      //       'data:', // external link icon
      //     ],
      //     'script-src-elem': ["'nonce-{{nonce}}'"],
      //     'style-src': [
      //       // TODO: replace with `style-src-elem` once Webkit supports it
      //       "'self'", // TODO: replace with `"'nonce-{{nonce}}'",` (https://github.com/vitejs/vite/pull/11864)
      //       "'unsafe-inline'", // TODO: replace with `"'nonce-{{nonce}}'",` (https://github.com/vitejs/vite/pull/11864)
      //     ],
      //   },
      //   {
      //     // nitro
      //     'connect-src': ["'self'"] /* swagger
      //     'http://localhost:3000/_nitro/openapi.json',
      //     'http://localhost:3000/_nitro/swagger', */,
      //     'script-src-elem': [
      //       'https://cdn.jsdelivr.net/npm/', // swagger // TODO: increase precision (https://github.com/unjs/nitro/issues/1757)
      //     ],
      //     'style-src': [
      //       'https://cdn.jsdelivr.net/npm/', // swagger // TODO: increase precision (https://github.com/unjs/nitro/issues/1757)
      //     ],
      //   },
      //   {
      //     // base
      //     'base-uri': ["'none'"], // does not fallback to `default-src`
      //     'child-src': [],
      //     'connect-src': [],
      //     'default-src': ["'none'"],
      //     'font-src': [],
      //     'form-action': ["'none'"], // does not fallback to `default-src`
      //     'frame-ancestors': ["'none'"], // does not fallback to `default-src`
      //     'frame-src': [],
      //     'img-src': [],
      //     'media-src': [],
      //     'navigate-to': [],
      //     'object-src': [],
      //     'prefetch-src': [],
      //     'report-to': [],
      //     'report-uri': [],
      //     // TODO: evaluate header (https://github.com/maevsi/maevsi/issues/830) // https://stackoverflow.com/questions/62081028/this-document-requires-trustedscripturl-assignment
      //     // 'require-trusted-types-for': ["'script'"], // csp-evaluator
      //     sandbox: [],
      //     'script-src': [],
      //     'script-src-attr': [],
      //     'script-src-elem': [],
      //     'style-src': [],
      //     'style-src-attr': [],
      //     'style-src-elem': [],
      //     'upgrade-insecure-requests': false, // TODO: set to `process.env.NODE_ENV === 'production'` or `true` when tests run on https
      //     'worker-src': [],
      //   },
      // ),
      crossOriginEmbedderPolicy: false, // https://stackoverflow.com/questions/71904052/getting-notsameoriginafterdefaultedtosameoriginbycoep-error-with-helmet
      xXSSProtection: '1; mode=block', // TODO: set back to `0` once CSP does not use `unsafe-*` anymore (https://github.com/maevsi/maevsi/issues/1047)
    },
    nonce: true,
  },
}
