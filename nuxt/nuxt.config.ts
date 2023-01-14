import graphqlPlugin from '@rollup/plugin-graphql'

import localeDe from './locales/de.json'
import localeEn from './locales/en.json'
import { JWT_NAME, LOCALES } from './utils/constants'

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
        cookies: {
          necessary: [
            {
              description: {
                de: 'Speichert die Zugriffsberechtigungen auf Daten.',
                en: 'Saves the access permissions to data.',
              },
              name: {
                de: 'Authentifizierungsdaten',
                en: 'Authentication Data',
              },
              targetCookieIds: [JWT_NAME()],
            },
            {
              description: {
                de: 'Speichert die Einstellungen, die in diesem Dialog getroffen werden.',
                en: 'Saves the settings made in this dialog.',
              },
              name: {
                de: 'Cookie-Präferenzen',
                en: 'Cookie Preferences',
              },
              targetCookieIds: [
                'cookie_control_is_consent_given',
                'cookie_control_cookies_enabled_ids',
              ],
            },
            {
              description: {
                de: 'Speichert in welcher Sprache die Webseite angezeigt wird.',
                en: 'Saves in which language the web page is displayed.',
              },
              name: {
                de: 'Spracheinstellungen',
                en: 'Language Settings',
              },
              targetCookieIds: ['i18n_redirected'],
            },
          ],
          optional: [
            {
              description: {
                de: 'Hilft uns dabei Nutzerverhalten zu verstehen und unsere Dienste zu verbessern.',
                en: 'Helps us understand user behavior and optimize our services.',
              },
              name: 'Google Analytics',
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
