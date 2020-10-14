import bodyParser from 'body-parser'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - maevsi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A manager for events supported by invitees.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    htmlAttrs: { class: 'h-full' },
    bodyAttrs: { class: 'font-sans h-full dark-mode:text-white' },
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'vue-croppa/dist/vue-croppa.css',
    'vue-datetime/dist/vue-datetime.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/mixins.js', '~/plugins/vuelidate.js'],

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
  modules: ['@nuxtjs/apollo'],

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
  serverMiddleware: [
    bodyParser.json(),
    { path: '/ical', handler: '~/api/ical.ts' },
    { path: '/tusd', handler: '~/api/tusd.ts' },
  ],
}
