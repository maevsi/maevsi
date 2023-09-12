import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import colors from 'tailwindcss/colors'

import {
  BASE_URL,
  CACHE_VERSION,
  I18N_COOKIE_NAME,
  JWT_NAME,
  LOCALES,
  SITE_NAME,
  TIMEZONE_COOKIE_NAME,
} from './utils/constants'

const currentDir = dirname(fileURLToPath(import.meta.url))

// TODO: let this error in "eslint (compat/compat)"" (https://github.com/DefinitelyTyped/DefinitelyTyped/issues/55519)
// setImmediate(() => {})

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
    enabled:
      process.env.NODE_ENV !== 'production' &&
      !process.env.NUXT_PUBLIC_VIO_IS_TESTING,
    timeline: {
      enabled: true,
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
        baseUrl: BASE_URL,
      },
      turnstile: {
        siteKey: '1x00000000000000000000AA',
      },
      vio: {
        googleAnalyticsId: '',
        isInProduction: process.env.NODE_ENV === 'production',
        isTesting: false,
        stagingHost:
          process.env.NODE_ENV !== 'production' && !process.env.STACK_DOMAIN
            ? 'maev.si'
            : undefined,
      },
    },
  },
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
            de: 'Dieser Cookie von uns speichert die Sprache, in der diese Webseite angezeigt wird.',
            en: "This cookie of ours stores the language that's used to display this website.",
          },
          id: 'l',
          name: {
            de: 'Sprache',
            en: 'Language',
          },
          targetCookieIds: [I18N_COOKIE_NAME],
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
      secure: process.env.NODE_ENV === 'production',
    },
    locales: ['en', 'de'],
  },
  htmlValidator: {
    failOnError: true,
    logLevel: 'warning',
  },
  i18n: {
    defaultLocale: 'en', // Must be set for the default prefix_except_default prefix strategy.
    detectBrowserLanguage: {
      cookieKey: I18N_COOKIE_NAME,
      cookieSecure: process.env.NODE_ENV === 'production',
    },
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
      // iarc_rating_id: '',
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
        //   url: '/event/%s',
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
          url: '/event',
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
    secretKeyPath: process.env.STACK_DOMAIN
      ? '/run/secrets/maevsi_turnstile-key'
      : undefined,
  },
  linkChecker: {
    enabled: false,
    failOnError: true,
  },
  seo: {
    splash: false,
  },
  site: {
    debug: process.env.NODE_ENV === 'development',
    name: SITE_NAME,
    url: BASE_URL,
  },
  sitemap: {
    credits: false,
    exclude: LOCALES.map(
      (locale) => `/${locale.code !== 'en' ? `${locale.code}/` : ''}teapot`, // TODO: %F0%9F%AB%96 (https://github.com/nuxt/framework/issues/8041)
    ),
  },
  tailwindcss: {
    cssPath: join(currentDir, './assets/css/tailwind.css'),
  },
})
