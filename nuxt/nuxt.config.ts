import graphqlPlugin from '@rollup/plugin-graphql'

import localeDe from './locales/de.json'
import localeEn from './locales/en.json'
import { LOCALES } from './utils/constants'

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
    [
      '@dargmuesli/nuxt-cookie-control',
      {
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
          // // The following cookies are considered necessary and are therefore currently only defined as a comment.
          // necessary: [
          //   {
          //     description: {
          //       de: 'Dieser Cookie von uns speichert die Zugriffsberechtigungen auf Daten.',
          //       en: 'This cookie from us stores the access permissions to data.',
          //     },
          //     name: {
          //       de: 'Authentifizierungsdaten',
          //       en: 'Authentication Data',
          //     },
          //     targetCookieIds: [JWT_NAME()],
          //   },
          //   {
          //     description: {
          //       de: 'Dieser Cookie von uns speichert die Einstellungen, die in diesem Dialog getroffen werden.',
          //       en: 'This cookie of ours stores the settings made in this dialog.',
          //     },
          //     name: {
          //       de: 'Cookie-Präferenzen',
          //       en: 'Cookie Preferences',
          //     },
          //     targetCookieIds: [
          //       'cookie_control_is_consent_given',
          //       'cookie_control_cookies_enabled_ids',
          //     ],
          //   },
          //   {
          //     description: {
          //       de: 'Dieser Cookie von uns speichert in welcher Sprache die Webseite angezeigt wird.',
          //       en: 'This cookie of ours stores in which language the website is displayed.',
          //     },
          //     name: {
          //       de: 'Spracheinstellungen',
          //       en: 'Language Settings',
          //     },
          //     targetCookieIds: ['i18n_redirected'],
          //   },
          //   {
          //     description: {
          //       de: 'Speichert die Zeitzone, in der sich das Gerät zu befinden scheint.',
          //       en: 'Saves the timezone in which the device appears to be located.',
          //     },
          //     name: {
          //       de: 'Zeitzone',
          //       en: 'Timezone',
          //     },
          //     targetCookieIds: [TIMEZONE_COOKIE_NAME],
          //   },
          // ],
          optional: [
            {
              description: {
                de: 'Die Cookies vom Drittanbieter Google analysieren Nutzerverhalten, was uns dabei hilft zu verstehen, wie diese Webseite genutzt wird, und dabei unsere Dienste zu verbessern.',
                en: 'The third-party cookies by Google analyze user behavior, which helps us understand how this website is used and to improve our services.',
              },
              id: 'google-analytics',
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
    ],
    [
      '@kevinmarrec/nuxt-pwa',
      {
        icon: {
          source: 'public/assets/static/favicon/android-chrome-512x512.png',
        },
        manifest: {
          theme_color: '#202020',
          background_color: '#202020',
        },
      },
    ],
    [
      '@nuxtjs/color-mode',
      {
        classSuffix: '',
      },
    ],
    [
      '@nuxtjs/html-validator',
      {
        failOnError: true,
        logLevel: 'warning',
      },
    ],
    [
      '@nuxtjs/i18n',
      {
        baseUrl: BASE_URL,
        defaultLocale: 'en', // Must be set for the default prefix_except_default prefix strategy.
        detectBrowserLanguage: {
          cookieSecure: true,
          redirectOn: 'root',
        },
        locales: LOCALES,
        vueI18n: {
          messages: {
            de: localeDe,
            en: localeEn,
          },
          fallbackWarn: false, // TODO: don't show incorrect warnings (https://github.com/intlify/vue-i18n-next/issues/776)
        },
      },
    ],
    '@nuxtjs/turnstile',
    '@pinia/nuxt',
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
      isInProduction: process.env.NODE_ENV === 'production',
      isTesting: false, // set via environment variable `NUXT_PUBLIC_IS_TESTING` only
      stagingHost:
        process.env.NODE_ENV !== 'production' &&
        !process.env.NUXT_PUBLIC_STACK_DOMAIN
          ? 'maev.si'
          : undefined,
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
    },
  },
  turnstile: {
    siteKey: '0x4AAAAAAAB-4n2PVIbNv24s',
  },
  typescript: {
    shim: false,
    strict: true,
    tsConfig: {
      compilerOptions: {
        esModuleInterop: true,
        // noErrorTruncation: true,
        types: ['jest'],
      },
      vueCompilerOptions: {
        htmlAttributes: [], // https://github.com/johnsoncodehk/volar/issues/1970#issuecomment-1276994634
      },
    },
  },
  vite: {
    plugins: [graphqlPlugin()],
  },
})
