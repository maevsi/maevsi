import { json } from 'body-parser'
import shrinkRay from 'shrink-ray-current'

import localeDe from './locales/de.json'
import localeEn from './locales/en.json'
import { BASE_URL, STACK_DOMAIN } from './plugins/baseUrl'

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

export default {
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
     ** https://github.com/nuxt-community/nuxt-property-decorator
     */
    babel: {
      presets({ _isServer }) {
        return [['@nuxt/babel-preset-app', { corejs: { version: 3 } }]]
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(_config, _ctx) {},
    extractCSS: true,
    transpile: ['fetch-blob', 'node-fetch', /\.mjs$/],
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    [
      '@nuxtjs/fontawesome',
      {
        icons: {
          brands: ['faGithub'],
          solid: [
            'faArchive',
            'faArrowsAltV',
            'faBars',
            'faBold',
            'faBug',
            'faCalendarDay',
            'faCheckCircle',
            'faCode',
            'faCog',
            'faDownload',
            'faEdit',
            'faExclamationCircle',
            'faEye',
            'faGlobeAfrica',
            'faHandshake',
            'faHeading',
            'faHome',
            'faHourglass',
            'faItalic',
            'faKey',
            'faLanguage',
            'faLink',
            'faListOl',
            'faListUl',
            'faMapMarker',
            'faPaperPlane',
            'faParagraph',
            'faPlus',
            'faQuestionCircle',
            'faQuoteRight',
            'faRedo',
            'faSearch',
            'faSignOutAlt',
            'faStrikethrough',
            'faTimes',
            'faTimesCircle',
            'faTrash',
            'faUndo',
            'faUnlink',
            'faUpload',
            'faUser',
            'faUserClock',
            'faWifi',
            'faWindowClose',
          ],
        },
        useLayers: false,
        useLayersText: false,
      },
    ],
    '@nuxtjs/google-analytics',
    '@nuxtjs/html-validator',
    // Doc: https://github.com/nuxt-community/moment-module
    ['@nuxtjs/moment', { locales: ['de'] }],
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['vue-datetime/dist/vue-datetime.min.css'],

  // Global page headers (https://go.nuxtjs.dev/config-head)
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
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} · maevsi` : 'maevsi'
      },
    }
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      'nuxt-helmet',
      {
        hsts: {
          maxAge: 31536000,
          preload: true,
        },
      },
    ], // Should be declared at the start of the array.
    'nuxt-healthcheck',
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
      '@nuxtjs/apollo',
      {
        clientConfigs: {
          default: '~/plugins/apollo-config.ts',
        },
        defaultOptions: {
          $query: {
            fetchPolicy: 'cache-and-network',
          },
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
      '@nuxtjs/google-adsense',
      {
        id: process.env.GOOGLE_ADSENSE_ID,
        analyticsDomainName: process.env.GOOGLE_ANALYTICS_DOMAIN,
        analyticsUacct: process.env.GOOGLE_ANALYTICS_ID,
      },
    ],
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

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/baseUrl.ts',
    '~/plugins/croppa.js',
    '~/plugins/domPurify.ts',
    '~/plugins/dynamicReactiveRefs.ts',
    '~/plugins/global.ts',
    '~/plugins/htmlToText.ts',
    '~/plugins/i18n.ts',
    '~/plugins/vuelidate.ts',
    '~/plugins/slugify.ts',
  ],

  publicRuntimeConfig: {
    dev: process.env.NODE_ENV !== 'production',
    'google-adsense': {
      id: process.env.GOOGLE_ADSENSE_ID,
      analyticsDomainName: process.env.GOOGLE_ANALYTICS_DOMAIN,
      analyticsUacct: process.env.GOOGLE_ANALYTICS_ID,
    },
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
      debug: process.env.NODE_ENV !== 'production',
    },
    STORYBOOK: process.env.STORYBOOK,
  },

  render: {
    compressor: shrinkRay(),
    csp: {
      policies: {
        'base-uri': ["'none'"], // Mozilla Observatory.
        'connect-src': [
          `https://*.${STACK_DOMAIN}`,
          'https://www.google-analytics.com',
        ],
        'default-src': ["'none'"],
        'font-src': ["'self'"],
        'form-action': ["'none'"], // Mozilla Observatory.
        'frame-ancestors': ["'none'"], // Mozilla Observatory.
        'img-src': [
          'data:',
          `https://*.${STACK_DOMAIN}`,
          'https://twemoji.maxcdn.com/',
          'https://www.google-analytics.com',
          'https://www.gravatar.com/avatar/',
          "'self'",
        ],
        'manifest-src': ["'self'"], // Chrome
        'report-uri': 'https://dargmuesli.report-uri.com/r/d/csp/enforce',
        'script-src': [
          "'self'",
          'https://static.cloudflareinsights.com/beacon.min.js',
          'https://www.google-analytics.com/analytics.js',
        ],
        'style-src': ["'self'"], // Tailwind
      },
      reportOnly: false,
    },
  },

  serverMiddleware: [
    json(),
    { handler: '~/middleware/server/headers.ts' },
    { path: '/auth', handler: '~/api/auth.ts' },
    { path: '/ical', handler: '~/api/ical.ts' },
    { path: '/tusd', handler: '~/api/tusd.ts' },
  ],

  storybook: {
    addons: ['@storybook/addon-a11y'],
  },

  vue: {
    config: {
      productionTip: false,
    },
  },
}
