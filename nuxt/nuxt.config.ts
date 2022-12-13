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
        cookies: {
          necessary: [
            {
              name: {
                de: 'Authentifizierungsdaten',
                en: 'Authentication Data',
              },
              // targetCookieIds: ['JWT_NAME'],
            },
            {
              name: {
                de: 'Cookie-Präferenzen',
                en: 'Cookie Preferences',
              },
              // targetCookieIds: ['cookie_control_consent', 'cookie_control_enabled_cookies'],
            },
            {
              name: {
                de: 'Spracheinstellungen',
                en: 'Language Settings',
              },
              // targetCookieIds: ['i18n_redirected'],
            },
          ],
          optional: [
            {
              name: 'Google Analytics',
              id: 'ga',
              // targetCookieIds: ['_ga', '_gat', '_gid'],
              // accepted: () => {
              //   const { $ga } = useNuxtApp()
              //   $ga.enable()
              // },
              // declined: () => {
              //   const { $ga } = useNuxtApp()
              //   $ga.disable()
              // },
            },
          ],
        },
        locales: ['en', 'de'],
      },
    ],
    [
      '@nuxtjs/color-mode',
      {
        classSuffix: '',
      },
    ],
    // [
    //   '@nuxtjs/google-analytics',
    //   {
    //     disabled: () => {
    //       const enabledCookies =
    //         document.cookie
    //           .match(
    //             '(^|;)\\s*' +
    //               'cookie_control_enabled_cookies' +
    //               '\\s*=\\s*([^;]+)'
    //           )
    //           ?.pop() || ''
    //       return !enabledCookies.split(',').includes('ga')
    //     },
    //   },
    // ],
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
        // vueI18nLoader: true,
      },
    ],
    // [
    //   '@nuxtjs/google-adsense',
    //   {
    //     id: process.env.GOOGLE_ADSENSE_ID,
    //     analyticsDomainName: process.env.GOOGLE_ANALYTICS_DOMAIN,
    //     analyticsUacct: process.env.GOOGLE_ANALYTICS_ID,
    //   },
    // ],
    '@nuxtjs/robots',
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
      isInProduction: process.env.NODE_ENV === 'production',
      stagingHost:
        process.env.NODE_ENV !== 'production' &&
        !process.env.NUXT_PUBLIC_STACK_DOMAIN
          ? 'maev.si'
          : undefined,
      // 'google-adsense': {
      //   id: process.env.GOOGLE_ADSENSE_ID,
      //   analyticsDomainName: process.env.GOOGLE_ANALYTICS_DOMAIN,
      //   analyticsUacct: process.env.GOOGLE_ANALYTICS_ID,
      // },
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID,
        debug: process.env.NODE_ENV !== 'production',
      },
      isTesting: !!process.env.CYPRESS,
    },
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
