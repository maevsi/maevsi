import { exec } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { sentryVitePlugin } from '@sentry/vite-plugin'

import { tryResolveModule } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
// import { defu } from 'defu'
import colors from 'tailwindcss/colors'

import {
  CACHE_VERSION,
  JWT_NAME,
  LOCALES,
  SITE_NAME,
  SITE_URL,
  TIMEZONE_COOKIE_NAME,
} from './utils/constants'

const currentDir = dirname(fileURLToPath(import.meta.url))
const execPromise = promisify(exec)
const RELEASE_NAME = async () =>
  (await execPromise('git describe --tags')).stdout.trim()

// TODO: let this error in "eslint (compat/compat)"" (https://github.com/DefinitelyTyped/DefinitelyTyped/issues/55519)
// setImmediate(() => {})

const resolve = async (modulePath: string, nuxt: Nuxt) => {
  const module = await tryResolveModule(modulePath, nuxt.options.modulesDir)

  if (!module) throw new Error(`Could not resolve module "${modulePath}"`)

  return module
}

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en', // fallback data to prevent invalid html at generation
      },
      title: SITE_NAME,
      titleTemplate: '%s', // fully set in `composables/useAppLayout.ts`
    },
    pageTransition: {
      name: 'layout',
    },
  },
  devtools: {
    timeline: {
      enabled: true,
    },
  },
  hooks: {
    'vite:extendConfig': async (config, { isClient }) => {
      config.plugins ||= []
      config.plugins.push(
        sentryVitePlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN,
          disable: !process.env.SENTRY_AUTH_TOKEN,
          release: {
            name: await RELEASE_NAME(),
          },
          org: 'maevsi',
          project: isClient ? 'client' : 'server',
          telemetry: false,
        }),
      )
    },
  },
  modules: [
    '@dargmuesli/nuxt-cookie-control',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/html-validator',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/turnstile',
    '@nuxtseo/module',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    async (_options: any, nuxt: Nuxt) => {
      nuxt.options.runtimeConfig.public.vio.releaseName = await RELEASE_NAME()
    },
    async (_options: any, nuxt: Nuxt) => {
      for (const module of ['@unhead/vue', 'ufo']) {
        nuxt.options.alias[module] = await resolve(module, nuxt)
      }
    }, // TODO: remove after next update following 2023-10-20 (https://github.com/nuxt-modules/i18n/releases, https://github.com/nuxt/nuxt/releases)
    // nuxt-security: remove invalid `'none'`s and duplicates
    (_options, nuxt) => {
      const nuxtConfigSecurity = nuxt.options.security

      if (
        typeof nuxtConfigSecurity.headers !== 'boolean' &&
        nuxtConfigSecurity.headers.contentSecurityPolicy &&
        typeof nuxtConfigSecurity.headers.contentSecurityPolicy !== 'boolean' &&
        typeof nuxtConfigSecurity.headers.contentSecurityPolicy !== 'string'
      ) {
        for (const [key, value] of Object.entries(
          nuxtConfigSecurity.headers.contentSecurityPolicy,
        )) {
          if (!Array.isArray(value)) continue

          const valueFiltered = value.filter((x) => x !== "'none'")

          if (valueFiltered.length) {
            ;(
              nuxtConfigSecurity.headers.contentSecurityPolicy as Record<
                string,
                any
              >
            )[key] = [...new Set(valueFiltered)]
          }
        }
      }
    },
    'nuxt-security',
  ],
  nitro: {
    compressPublicAssets: true,
  },
  postcss: {
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },
  runtimeConfig: {
    public: {
      i18n: {
        baseUrl: SITE_URL,
      },
      sentry: {
        host: 'o4506083883352064.ingest.sentry.io',
        project: {
          client: {
            id: '4506114193817600',
            publicKey: '6263f9ee33de7bc8d128c160df268869',
          },
          server: {
            id: '4506114183528448',
            publicKey: 'be543bc70951bae8ed5bc5874b99b112',
          },
        },
      },
      turnstile: {
        siteKey: '0x4AAAAAAABtEW1Hc8mcgWcZ',
      },
      vio: {
        environment: process.env.NODE_ENV || 'development',
        googleAnalyticsId: 'G-WMQ1JY99XH',
        isTesting: false,
        stagingHost:
          process.env.NODE_ENV !== 'production' &&
          !process.env.NUXT_PUBLIC_SITE_URL
            ? 'maev.si'
            : undefined,
      },
    },
  },
  sourcemap: true,
  typescript: {
    shim: false,
    strict: true,
    tsConfig: {
      compilerOptions: {
        esModuleInterop: true,
        // noErrorTruncation: true,
      },
    },
  },

  // Modules
  colorMode: {
    classSuffix: '',
  },
  cookieControl: {
    colors: {
      checkboxActiveBackground: '#00A34A', // text-green-600
    },
    /**
     * "The Cookie Law does not require that you list cookies one by one, only that you state their type, usage and purpose.
     * The cookie policy must:
     * - indicate the type of cookies installed (first-party cookies vs third-party cookies* );
     * - indicate all third-parties that install, manage, or access cookies via your site/app, with a link to their respective policies, and any opt-out forms (where available);
     * - describe – in detail – the purposes for which cookies are used;
     * - be available in all languages in which the service is provided."
     *
     * https://www.iubenda.com/en/help/5525-cookies-gdpr-requirements
     * https://www.iubenda.com/en/help/23672-gdpr-cookie-consent-cheatsheet
     **/
    cookies: {
      necessary: [
        {
          description: {
            de: 'Dieser Cookie von uns speichert Berechtigungen für den Datenbankzugriff dieser Webseite.',
            en: "This cookie of ours stores permissions for this website's database access.",
          },
          id: 'a',
          name: {
            de: 'Authentifizierungsdaten',
            en: 'Authentication Data',
          },
          targetCookieIds: [JWT_NAME()],
        },
        {
          description: {
            de: 'Dieser Cookie von uns speichert die Einstellungen, die in diesem Dialog getroffen werden.',
            en: 'This cookie of ours stores the settings made in this dialog.',
          },
          id: 'c',
          name: {
            de: 'Cookie-Präferenzen',
            en: 'Cookie Preferences',
          },
          targetCookieIds: ['ncc_c', 'ncc_e'],
        },
        {
          description: {
            de: 'Dieser Cookie von uns speichert die Zeitzone, in der sich das Gerät zu befinden scheint.',
            en: 'This cookie of ours saves the timezone in which the device appears to be located.',
          },
          id: 't',
          name: {
            de: 'Zeitzone',
            en: 'Timezone',
          },
          targetCookieIds: [TIMEZONE_COOKIE_NAME],
        },
      ],
      optional: [
        {
          description: {
            de: 'Die Cookies vom Drittanbieter Google ermöglichen die Analyse von Nutzerverhalten. Diese Analyse hilft uns unsere Dienste zu verbessern, indem wir verstehen, wie diese Webseite genutzt wird.',
            en: 'The third-party cookies by Google enable the analysis of user behavior. This analysis helps us to improve our services by understanding how this website is used.',
          },
          id: 'ga',
          links: {
            'https://policies.google.com/privacy': 'Google Privacy Policy',
            'https://policies.google.com/terms': 'Google Terms of Service',
          },
          name: 'Analytics',
          targetCookieIds: ['_ga', '_ga_WMQ1JY99XH'],
        },
      ],
    },
    cookieOptions: {
      sameSite: 'strict',
    },
    locales: ['en', 'de'],
  },
  htmlValidator: {
    failOnError: true,
    logLevel: 'warning',
  },
  i18n: {
    defaultLocale: 'en', // Must be set for the default prefix_except_default prefix strategy.
    detectBrowserLanguage: false,
    langDir: 'locales',
    lazy: true,
    locales: LOCALES,
  },
  pwa: {
    devOptions: {
      enabled: true,
      type: 'module', // must be developed in Chrome
    },
    client: {
      periodicSyncForUpdates: 3600,
      installPrompt: true,
    },
    filename: 'sw.ts',
    manifest: {
      background_color: colors.gray['800'],
      categories: ['events'],
      description: 'Find events, guests and friends.',
      dir: 'ltr',
      display: 'standalone',
      display_override: ['window-controls-overlay', 'standalone', 'browser'],
      edge_side_panel: {
        preferred_width: 400,
      },
      file_handlers: [
        // {
        //   action: '/open-ics',
        //   accept: {
        //     'text/calendar': ['.ics'],
        //   },
        //   icons: [
        //     {
        //       src: 'ics-icon.png',
        //       sizes: '256x256',
        //       type: 'image/png',
        //     },
        //   ],
        //   launch_type: 'single-client',
        // },
      ],
      handle_links: 'preferred',
      iarc_rating_id: '4bc30419-7452-4496-b02b-5feac10842dc',
      icons: [
        {
          src: `/assets/static/favicon/android-chrome-64x64.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '64x64',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-64x64.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '64x64',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-120x120.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '120x120',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-120x120.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '120x120',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-144x144.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '144x144',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-144x144.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '144x144',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-152x152.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '152x152',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-152x152.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '152x152',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-192x192.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '192x192',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-192x192.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '192x192',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-384x384.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '384x384',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-384x384.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '384x384',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-512x512.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '512x512',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-512x512.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '512x512',
          purpose: 'maskable',
        },
      ],
      id: '/?source=pwa',
      lang: 'en',
      launch_handler: {
        client_mode: ['auto'],
      },
      name: 'maevsi',
      short_name: 'maevsi',
      orientation: 'any',
      scope: '/',
      screenshots: [
        {
          src: '/assets/static/screenshots/narrow/root.png',
          sizes: '432x768',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'root',
        },
        {
          src: '/assets/static/screenshots/narrow/events.png',
          sizes: '432x768',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'events',
        },
        {
          src: '/assets/static/screenshots/wide/root.png',
          sizes: '1920x1080',
          type: 'image/png',
          form_factor: 'wide',
          label: 'root',
        },
        {
          src: '/assets/static/screenshots/wide/events.png',
          sizes: '1920x1080',
          type: 'image/png',
          form_factor: 'wide',
          label: 'events',
        },
      ],
      start_url: '/?source=pwa',
      prefer_related_applications: false,
      protocol_handlers: [
        // {
        //   protocol: 'web+maevsi',
        //   url: '/events/%s',
        // },
      ],
      related_applications: [
        // {
        //   platform: 'play',
        //   url: 'https://play.google.com/store/apps/details?id=si.maev.twa',
        //   id: 'si.maev.twa',
        // },
      ],
      scope_extensions: [{ origin: 'maev.si' }, { origin: 'maevsi.com' }],
      // share_target: {
      //   action: '/collect-files',
      //   method: 'POST',
      //   enctype: 'multipart/form-data',
      //   params: {
      //     title: 'title',
      //     text: 'text',
      //     url: 'url',
      //     files: [
      //       {
      //         name: 'lists',
      //         accept: ['text/csv', '.csv'],
      //       },
      //     ],
      //   },
      // },
      shortcuts: [
        {
          description: 'See a list of events.',
          short_name: 'Events',
          name: 'Explore events',
          url: '/events',
        },
      ],
      theme_color: colors.gray['800'],
      // widgets: [
      //   {
      //     name: 'PWAmp mini player',
      //     description: 'widget to control the PWAmp music player',
      //     tag: 'pwamp',
      //     template: 'pwamp-template',
      //     ms_ac_template: 'widgets/mini-player-template.json',
      //     data: 'widgets/mini-player-data.json',
      //     type: 'application/json',
      //     screenshots: [
      //       {
      //         src: './screenshot-widget.png',
      //         sizes: '600x400',
      //         label: 'The PWAmp mini-player widget',
      //       },
      //     ],
      //     icons: [
      //       {
      //         src: './favicon-16.png',
      //         sizes: '16x16',
      //       },
      //     ],
      //     auth: false,
      //     update: 86400,
      //   },
      // ],
    },
    srcDir: 'service-worker',
    strategies: 'injectManifest',
  },
  turnstile: {
    secretKeyPath: process.env.NUXT_PUBLIC_SITE_URL
      ? '/run/secrets/maevsi_turnstile-key'
      : undefined,
  },
  linkChecker: {
    enabled: false,
    failOnError: true,
  },
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
      //       'https://polyfill.io/v3/polyfill.min.js', // ESLint plugin compat
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
    nonce: {
      enabled: true,
    },
  },
  seo: {
    splash: false,
  },
  site: {
    name: SITE_NAME,
    url: SITE_URL,
  },
  sitemap: {
    credits: false,
    exclude: LOCALES.map(
      (locale) =>
        `/${locale.code !== 'en' ? `${locale.code}/` : ''}%F0%9F%AB%96`,
    ),
  },
  tailwindcss: {
    cssPath: join(currentDir, './assets/css/tailwind.css'),
  },

  // environments
  $development: {
    devtools: {
      enabled: !process.env.NUXT_PUBLIC_VIO_IS_TESTING,
    },
    runtimeConfig: {
      public: {
        vio: {
          isInProduction: false,
        },
      },
    },

    // modules
    security: {
      headers: {
        strictTransportSecurity: false,
      },
      rateLimiter: false, // TODO: enable when nuxt-link-checker bundles requests (https://github.com/harlan-zw/nuxt-link-checker/issues/21)
    },
    site: {
      debug: true,
    },
  },
  $production: {
    runtimeConfig: {
      public: {
        vio: {
          isInProduction: true,
        },
      },
    },

    // modules
    cookieControl: {
      cookieOptions: {
        secure: true,
      },
    },
    security: {
      headers: {
        strictTransportSecurity: {
          maxAge: 31536000,
          includeSubdomains: true,
          preload: true,
        },
      },
      rateLimiter: false // TODO: enable the below when runtime configuration is supported (https://github.com/Baroshem/nuxt-security/pull/233/files)
      // ...(process.env.NUXT_PUBLIC_VIO_IS_TESTING === 'true'
      //   ? { rateLimiter: false }
      //   : {}),
    },
  },
})
