import { defineNuxtConfig } from '@nuxt/bridge'
import { Configuration } from 'webpack'

import localeDe from './locales/de.json'
import localeEn from './locales/en.json'
import { BASE_URL } from './plugins/static/constants'

const LOCALES = [
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
            splitChunks: {
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
  head() {
    return {
      bodyAttrs: {
        class:
          'bg-white dark:bg-background-body font-sans text-text-dark dark:text-text-bright',
      },
      link: [
        {
          href: '/assets/static/favicon/apple-touch-icon.png?v=bOXMwoKlJr',
          rel: 'apple-touch-icon',
          sizes: '180x180',
        },
        {
          href: '/assets/static/favicon/favicon-16x16.png?v=bOXMwoKlJr',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          href: '/assets/static/favicon/favicon-32x32.png?v=bOXMwoKlJr',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          href: '/assets/static/favicon/favicon.ico',
          rel: 'icon',
          type: 'image/x-icon',
        },
        {
          href: '/assets/static/favicon/site.webmanifest?v=bOXMwoKlJr',
          rel: 'manifest',
        },
        {
          color: '#202020',
          href: '/assets/static/favicon/safari-pinned-tab.svg?v=bOXMwoKlJr',
          rel: 'mask-icon',
        },
        {
          href: '/assets/static/favicon/favicon.ico?v=bOXMwoKlJr',
          rel: 'shortcut icon',
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { content: 'width=device-width, initial-scale=1', name: 'viewport' },
        {
          hid: 'description',
          name: 'description',
          property: 'description',
          content: this.$t('globalOgSeoDescription'),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('globalOgSeoDescription'),
        },
        {
          content: '/assets/static/favicon/browserconfig.xml?v=bOXMwoKlJr',
          name: 'msapplication-config',
        },
        {
          content: '#202020',
          name: 'msapplication-TileColor',
        },
        {
          content: '#202020',
          name: 'theme-color',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            this.$baseUrl +
            '/assets/static/logos/maevsi_with-text_open-graph.png', // Does not support .svg as of 2021-06.
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.$t('globalOgImageAlt'),
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '627',
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '1200',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'maevsi',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website', // https://ogp.me/#types
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'maevsi',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: this.$t('globalOgSeoDescription'),
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content:
            this.$baseUrl +
            '/assets/static/logos/maevsi_with-text_open-graph.png', // Does not support .svg as of 2021-06.
        },
        {
          hid: 'twitter:image:alt',
          property: 'twitter:image:alt',
          content: this.$t('globalOgImageAlt'),
        },
        // TODO: Get access to the @maevsi handle.
        // {
        //   hid: 'twitter:site',
        //   property: 'twitter:site',
        //   content: '@maevsi',
        // },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: 'maevsi',
        },
      ],
      titleTemplate: (titleChunk: string) => {
        return titleChunk ? `${titleChunk} · maevsi` : 'maevsi'
      },
    }
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
  plugins: [
    '~/plugins/croppa.js',
    '~/plugins/i18n.ts',
    '~/plugins/urql.ts',
    '~/plugins/util.ts',
    '~/plugins/vuelidate.ts',
  ],
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
