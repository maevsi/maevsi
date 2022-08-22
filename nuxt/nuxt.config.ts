import { defineNuxtConfig } from '@nuxt/bridge'
import { LocaleObject } from '@nuxtjs/i18n/types'
import { Configuration } from 'webpack'

import localeDe from './locales/de.json'
import localeEn from './locales/en.json'
import { BASE_URL } from './plugins/util/constants'

export const LOCALES: LocaleObject[] = [
  {
    code: 'en',
    name: 'English',
    iso: 'en', // Will be used as catchall locale by default.
  },
  {
    code: 'de',
    name: 'Deutsch',
    iso: 'de',
  },
]
const EXCLUSIONS = ['/%F0%9F%AB%96']
const EXCLUSIONS_LOCALIZED = []

for (const exclusion of EXCLUSIONS) {
  for (const locale of LOCALES) {
    EXCLUSIONS_LOCALIZED.push(`/${locale.code}${exclusion}`)
  }
}

export default defineNuxtConfig({
  alias: {
    tslib: 'tslib/tslib.es6.js',
    'tus-js-client': 'tus-js-client/lib.es5/browser/index.js',
  },
  bridge: {
    meta: true,
  },
  build: {
    babel: {
      presets() {
        return [['@nuxt/babel-preset-app', { corejs: { version: 3 } }]]
      },
    },
    extend(config: Configuration) {
      config.module?.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      })
    },
    extractCSS: true,
    ...(process.env.NODE_ENV === 'production'
      ? {}
      : {
          optimization: {
            runtimeChunk: true,
            splitChunks: {
              name: true,
              cacheGroups: {
                styles: {
                  name: 'styles',
                  test: /.(css|vue)$/,
                  chunks: 'all',
                  enforce: true,
                },
              },
            },
          },
        }), // https://github.com/nuxt/bridge/issues/43
    postcss: {
      plugins: { tailwindcss: {}, autoprefixer: {} },
    },
    transpile: [
      '@http-util/status-i18n',
      'barcode-detector',
      'cross-fetch',
      'graphql',
      'hash.js',
      'headers-polyfill',
      'lodash',
      'lodash-es',
      'moment',
      'node-fetch',
      'pretty-bytes',
      'subscriptions-transport-ws',
      'tslib',
      'universal-cookie',
      'vue-chartjs',
      'vue-qrcode-reader',
      'webrtc-adapter',
    ],
  },
  buildModules: [
    [
      '@nuxtjs/google-analytics',
      {
        disabled: () => {
          const enabledCookies =
            document.cookie
              .match(
                '(^|;)\\s*' +
                  'cookie_control_enabled_cookies' +
                  '\\s*=\\s*([^;]+)'
              )
              ?.pop() || ''
          return !enabledCookies.split(',').includes('ga')
        },
      },
    ],
    [
      '@nuxtjs/html-validator',
      {
        failOnError: true,
      },
    ],
    // Doc: https://github.com/nuxt-community/moment-module
    ['@nuxtjs/moment', { locales: ['de'] }],
    '@pinia/nuxt',
  ],
  components: true, // Auto import components
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
          window.$nuxt.$ga.enable()
        },
        declined: () => {
          window.$nuxt.$ga.disable()
        },
      },
    ],
  },
  css: ['@/assets/css/main.css', 'vue-datetime/dist/vue-datetime.min.css'],
  dir: {
    static: 'public',
  },
  loading: { color: '#fff' }, // Customize the progress-bar color
  modules: [
    [
      '@dargmuesli/nuxt-cookie-control',
      {
        locales: ['en', 'de'],
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
        vueI18nLoader: true,
      },
    ],
    [
      '@nuxtjs/color-mode',
      {
        classSuffix: '',
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
    [
      '@nuxtjs/robots',
      {
        Allow: ['/'],
        Disallow: ['/robots.txt'], // https://webmasters.stackexchange.com/a/117537/70856
        Sitemap: BASE_URL + '/sitemap.xml',
      },
    ],
    ['@nuxtjs/sitemap', { exclude: EXCLUSIONS_LOCALIZED, i18n: true }], // Should be declared at the end of the array.
  ],
  nitro: {
    autoImport: {
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ], // Can be removed in unjs/nitro > v0.4.12
    },
  },
  plugins: ['~/plugins/croppa.js', '~/plugins/i18n.ts', '~/plugins/urql.ts'],
  publicRuntimeConfig: {
    dev: process.env.NODE_ENV !== 'production',
    // 'google-adsense': {
    //   id: process.env.GOOGLE_ADSENSE_ID,
    //   analyticsDomainName: process.env.GOOGLE_ANALYTICS_DOMAIN,
    //   analyticsUacct: process.env.GOOGLE_ANALYTICS_ID,
    // },
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
      debug: process.env.NODE_ENV !== 'production',
    },
    STORYBOOK: process.env.STORYBOOK,
  },
  // // seemed to still work in v0.137.1
  // render: {
  //   compressor: compressionWithBrotli(),
  // },
  storybook: {
    addons: ['@storybook/addon-a11y'],
  },
  typescript: {
    strict: true,
  },
  vue: {
    config: {
      productionTip: false, // Remove in vue 3.
    },
  },
})
