import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import graphqlPlugin from '@rollup/plugin-graphql'

import localeDe from './locales/de.json'
import localeEn from './locales/en.json'
import {
  SITEMAP_EXCLUSIONS,
  SITEMAP_EXCLUSIONS_LOCALIZED,
  LOCALES,
} from './plugins/util/constants'

for (const exclusion of SITEMAP_EXCLUSIONS) {
  for (const locale of LOCALES) {
    SITEMAP_EXCLUSIONS_LOCALIZED.push(`/${locale.code}${exclusion}`)
  }
}

const BASE_URL =
  'https://' +
  (process.env.NUXT_PUBLIC_STACK_DOMAIN ||
    `${process.env.HOST || 'localhost'}:3000`) // TODO: deprecated

export default defineNuxtConfig({
  cookies: {
    necessary: [
      {
        name: {
          de: 'Authentifizierungsdaten',
          en: 'Authentication Data',
        },
        // cookies: ['JWT_NAME'],
      },
      {
        name: {
          de: 'Cookie-Präferenzen',
          en: 'Cookie Preferences',
        },
        // cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies'],
      },
      {
        name: {
          de: 'Spracheinstellungen',
          en: 'Language Settings',
        },
        // cookies: ['i18n_redirected'],
      },
    ],
    optional: [
      {
        name: 'Google Analytics',
        identifier: 'ga',
        // cookies: ['_ga', '_gat', '_gid'],
        accepted: () => {
          const { $ga } = useNuxtApp()
          $ga.enable()
        },
        declined: () => {
          const { $ga } = useNuxtApp()
          $ga.disable()
        },
      },
    ],
  },
  css: ['@/assets/css/main.css', 'vue-datetime/dist/vue-datetime.min.css'],
  dir: {
    static: 'public',
  },
  loading: { color: '#fff' }, // Customize the progress-bar color
  layoutTransition: {
    name: 'layout',
  },
  modules: [
    // [
    //   '@dargmuesli/nuxt-cookie-control',
    //   {
    //     locales: ['en', 'de'],
    //   },
    // ],
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
          silentFallbackWarn: true,
        },
        // vueI18nLoader: true,
      },
    ],
    // ['@nuxtjs/moment', { locales: ['de'] }],
    // [
    //   '@nuxtjs/google-adsense',
    //   {
    //     id: process.env.GOOGLE_ADSENSE_ID,
    //     analyticsDomainName: process.env.GOOGLE_ANALYTICS_DOMAIN,
    //     analyticsUacct: process.env.GOOGLE_ANALYTICS_ID,
    //   },
    // ],
    [
      '@nuxtjs/robots',
      {
        Allow: ['/'],
        Disallow: ['/robots.txt'], // https://webmasters.stackexchange.com/a/117537/70856
        Sitemap: BASE_URL + '/sitemap.xml',
      },
    ],
    '@pinia/nuxt',
    // ['@nuxtjs/sitemap', { exclude: SITEMAP_EXCLUSIONS_LOCALIZED, i18n: true }], // Should be declared at the end of the array.
  ],
  nitro: {
    compressPublicAssets: true,
  },
  postcss: {
    // @ts-ignore https://github.com/nuxt/bridge/issues/29
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },
  runtimeConfig: {
    public: {
      isInDevelopment: process.env.NODE_ENV !== 'production',
      // 'google-adsense': {
      //   id: process.env.GOOGLE_ADSENSE_ID,
      //   analyticsDomainName: process.env.GOOGLE_ANALYTICS_DOMAIN,
      //   analyticsUacct: process.env.GOOGLE_ANALYTICS_ID,
      // },
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID,
        debug: process.env.NODE_ENV !== 'production',
      },
      isStorybookActive: !!process.env.STORYBOOK,
    },
  },
  // storybook: {
  //   addons: ['@storybook/addon-a11y'],
  // },
  typescript: {
    shim: false,
    strict: true,
  },
  vite: {
    plugins: [
      VueI18nPlugin({
        include:
          '!' +
          resolve(dirname(fileURLToPath(import.meta.url)), './node_modules/**'), // https://github.com/intlify/bundle-tools/issues/168
      }),
      // @ts-ignore https://github.com/rollup/plugins/issues/1243
      graphqlPlugin(),
    ],
  },
})
