import { JWT_NAME, LOCALES, TIMEZONE_COOKIE_NAME } from './utils/constants'

export const SITEMAP_EXCLUSIONS = ['/teapot'] // TODO: %F0%9F%AB%96 (https://github.com/nuxt/framework/issues/8041)
export const SITEMAP_EXCLUSIONS_LOCALIZED: string[] = []

for (const exclusion of SITEMAP_EXCLUSIONS) {
  for (const locale of [{ code: '' }, ...LOCALES]) {
    SITEMAP_EXCLUSIONS_LOCALIZED.push(`/${locale.code}${exclusion}`)
  }
}

const BASE_URL =
  'https://' +
  (process.env.NUXT_PUBLIC_STACK_DOMAIN ||
    `${process.env.HOST || 'localhost'}:3000`)

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'layout',
    },
  },
  css: ['@/assets/css/main.css'],
  modules: [
    '@dargmuesli/nuxt-cookie-control',
    '@nuxtjs/color-mode',
    '@nuxtjs/html-validator',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    [
      '@funken-studio/sitemap-nuxt-3',
      { exclude: SITEMAP_EXCLUSIONS_LOCALIZED, i18n: true },
    ], // Should be declared at the end of the array.
  ],
  nitro: {
    compressPublicAssets: true,
  },
  postcss: {
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },
  runtimeConfig: {
    public: {
      googleAnalyticsId: '', // set via environment variable `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` only
      i18n: {
        baseUrl: BASE_URL,
      },
      isInProduction: process.env.NODE_ENV === 'production',
      stagingHost:
        process.env.NODE_ENV !== 'production' &&
        !process.env.NUXT_PUBLIC_STACK_DOMAIN
          ? 'maev.si'
          : undefined,
    },
  },
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        esModuleInterop: true,
        // noErrorTruncation: true,
      },
      vueCompilerOptions: {
        htmlAttributes: [], // https://github.com/johnsoncodehk/volar/issues/1970#issuecomment-1276994634
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
          targetCookieIds: ['i18n_redirected'],
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
          targetCookieIds: [
            '_ga',
            '_ga_WMQ1JY99XH',
            '_gat_gtag_UA_186047809_1',
            '_gid',
          ],
        },
      ],
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
      cookieSecure: true,
      redirectOn: 'root',
    },
    locales: LOCALES,
    vueI18n: './i18n.config.ts',
  },
  pwa: {
    // Leads to issues with Cypress e2e tests.
    // devOptions: {
    //   enabled: true,
    // },
    client: {
      installPrompt: true,
    },
    manifest: {
      description: 'Find events, guests and friends.',
      background_color: '#1f2937',
      theme_color: '#1f2937',
      icons: [
        {
          src: '/assets/static/favicon/android-chrome-64x64.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '64x64',
          purpose: 'any',
        },
        {
          src: '/assets/static/favicon/android-chrome-64x64.maskable.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '64x64',
          purpose: 'maskable',
        },
        {
          src: '/assets/static/favicon/android-chrome-120x120.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '120x120',
          purpose: 'any',
        },
        {
          src: '/assets/static/favicon/android-chrome-120x120.maskable.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '120x120',
          purpose: 'maskable',
        },
        {
          src: '/assets/static/favicon/android-chrome-144x144.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '144x144',
          purpose: 'any',
        },
        {
          src: '/assets/static/favicon/android-chrome-144x144.maskable.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '144x144',
          purpose: 'maskable',
        },
        {
          src: '/assets/static/favicon/android-chrome-152x152.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '152x152',
          purpose: 'any',
        },
        {
          src: '/assets/static/favicon/android-chrome-152x152.maskable.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '152x152',
          purpose: 'maskable',
        },
        {
          src: '/assets/static/favicon/android-chrome-192x192.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '192x192',
          purpose: 'any',
        },
        {
          src: '/assets/static/favicon/android-chrome-192x192.maskable.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '192x192',
          purpose: 'maskable',
        },
        {
          src: '/assets/static/favicon/android-chrome-384x384.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '384x384',
          purpose: 'any',
        },
        {
          src: '/assets/static/favicon/android-chrome-384x384.maskable.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '384x384',
          purpose: 'maskable',
        },
        {
          src: '/assets/static/favicon/android-chrome-512x512.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'any',
        },
        {
          src: '/assets/static/favicon/android-chrome-512x512.maskable.png?v=2EvuFKRRxT',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'maskable',
        },
      ],
    },
  },
})
