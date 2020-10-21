import bodyParser from 'body-parser'
import shrinkRay from 'shrink-ray-current'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - maevsi` : 'maevsi'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A manager for events supported by invitees.',
      },
      {
        name: 'msapplication-config',
        content: '/assets/static/favicon/browserconfig.xml?v=bOXMwoKlJr',
      },
      {
        name: 'msapplication-TileColor',
        content: '#202020',
      },
      {
        name: 'theme-color',
        content: '#202020',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/assets/static/favicon/apple-touch-icon.png?v=bOXMwoKlJr',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/assets/static/favicon/favicon-32x32.png?v=bOXMwoKlJr',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/assets/static/favicon/favicon-16x16.png?v=bOXMwoKlJr',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/assets/static/favicon/favicon.ico',
      },
      {
        rel: 'manifest',
        href: '/assets/static/favicon/site.webmanifest?v=bOXMwoKlJr',
      },
      {
        rel: 'mask-icon',
        href: '/assets/static/favicon/safari-pinned-tab.svg?v=bOXMwoKlJr',
        color: '#202020',
      },
      {
        rel: 'shortcut icon',
        href: '/assets/static/favicon/favicon.ico?v=bOXMwoKlJr',
      },
    ],
    htmlAttrs: { class: 'h-full' },
    bodyAttrs: { class: 'font-sans h-full dark-mode:text-white' },
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['vue-croppa/dist/vue-croppa.css', 'vue-datetime/dist/vue-datetime.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/global.js',
    '~/plugins/vuelidate.js',
    '~/plugins/slugify.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    [
      '@nuxtjs/fontawesome',
      {
        icons: {
          brands: ['faGithub'],
          solid: [
            'faArchive',
            'faBug',
            'faCalendarDay',
            'faCog',
            'faDownload',
            'faCheckCircle',
            'faExternalLinkAlt',
            'faKey',
            'faGlobeAfrica',
            'faHome',
            'faHourglass',
            'faMapMarker',
            'faPlus',
            'faUser',
            'faUpload',
            'faSignOutAlt',
            'faTrash',
            'faWindowClose',
          ],
        },
        useLayers: false,
        useLayersText: false,
      },
    ],
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/moment-module
    ['@nuxtjs/moment', { locales: ['de'] }],
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-helmet', // Should be declared at the start of the array.
    '@nuxtjs/apollo',
    '@nuxtjs/sitemap', // Should be declared at the end of the array.
  ],

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(_config, _ctx) {},
    /*
     ** https://github.com/nuxt-community/nuxt-property-decorator
     */
    babel: {
      presets({ _isServer }) {
        return [
          ['@nuxt/babel-preset-app', { loose: true, corejs: { version: 3 } }],
        ]
      },
    },
  },
  render: {
    compressor: shrinkRay(),
    csp: {
      reportOnly: false,
    },
  },
  serverMiddleware: [
    bodyParser.json(),
    { path: '/auth', handler: '~/api/auth.ts' },
    { path: '/ical', handler: '~/api/ical.ts' },
    { path: '/tusd', handler: '~/api/tusd.ts' },
  ],
  helmet: {
    hsts: {
      maxAge: 31536000,
      preload: true,
    },
  },
}
