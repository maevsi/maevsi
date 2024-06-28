import { exec } from 'node:child_process'
import { promisify } from 'node:util'

import { sentryVitePlugin } from '@sentry/vite-plugin'
import type { Nuxt, ModuleOptions } from 'nuxt/schema'
// import { defu } from 'defu'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'

import { modulesConfig } from '../config/modules'
import { environmentsConfig } from '../config/environments'
import { SITE_NAME, SITE_URL } from '../utils/constants'

const execPromise = promisify(exec)
const RELEASE_NAME = async () =>
  process.env.RELEASE_NAME ||
  (await execPromise('git describe --tags')).stdout.trim()

// TODO: let this error in "eslint (compat/compat)"" (https://github.com/DefinitelyTyped/DefinitelyTyped/issues/55519)
// setImmediate(() => {})

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en', // fallback data to prevent invalid html at generation
      },
      title: SITE_NAME,
      titleTemplate: '%s', // fully set in `composables/useAppLayout.ts`
    },
  },
  hooks: {
    'vite:extendConfig': async (config, { isClient }) => {
      config.plugins ||= []
      config.plugins.push(
        sentryVitePlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN,
          disable: !process.env.SENTRY_AUTH_TOKEN,
          release: {
            name: await RELEASE_NAME(),
          },
          org: 'maevsi',
          project: isClient ? 'client' : 'server',
          telemetry: false,
        }),
      )
    },
  },
  modules: [
    '@dargmuesli/nuxt-cookie-control',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/scripts',
    // '@nuxtjs/color-mode', // installed by @nuxt/ui
    '@nuxtjs/html-validator',
    '@nuxtjs/i18n',
    // '@nuxtjs/tailwindcss', // installed by @nuxt/ui
    '@nuxtjs/seo',
    '@nuxtjs/turnstile',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-gtag',
    async (_options: ModuleOptions, nuxt: Nuxt) => {
      nuxt.options.runtimeConfig.public.vio.releaseName = await RELEASE_NAME()
    },
    // nuxt-security: remove invalid `'none'`s and duplicates
    (_options: ModuleOptions, nuxt: Nuxt) => {
      const nuxtConfigSecurity = nuxt.options.security

      if (
        typeof nuxtConfigSecurity.headers !== 'boolean' &&
        nuxtConfigSecurity.headers.contentSecurityPolicy &&
        typeof nuxtConfigSecurity.headers.contentSecurityPolicy !== 'boolean' &&
        typeof nuxtConfigSecurity.headers.contentSecurityPolicy !== 'string'
      ) {
        for (const [key, value] of Object.entries(
          nuxtConfigSecurity.headers.contentSecurityPolicy,
        )) {
          if (!Array.isArray(value)) continue

          const valueFiltered = value.filter((x) => x !== "'none'")

          if (valueFiltered.length) {
            ;(
              nuxtConfigSecurity.headers.contentSecurityPolicy as Record<
                string,
                unknown
              >
            )[key] = [...new Set(valueFiltered)]
          }
        }
      }
    },
    'nuxt-security',
    'nuxt-typed-router',
  ],
  nitro: {
    compressPublicAssets: true,
  },
  runtimeConfig: {
    public: {
      i18n: {
        ...(process.env.NODE_ENV === 'development'
          ? {}
          : { baseUrl: SITE_URL }),
      },
      sentry: {
        host: 'o4507213726154752.ingest.de.sentry.io',
        profiles: {
          sampleRate: 1.0,
        },
        project: {
          client: {
            id: '4507213736837200',
            publicKey: '5e253cec6a72a9eea44531e7205016ba',
          },
          server: {
            id: '4507213739393104',
            publicKey: 'a02892bc5feeb74b598b1edd33c14336',
          },
        },
        replays: {
          onError: {
            sampleRate: 1.0,
          },
          session: {
            sampleRate: 0.0,
          },
        },
      },
      turnstile: {
        siteKey: '0x4AAAAAAABtEW1Hc8mcgWcZ',
      },
      vio: {
        environment: process.env.NODE_ENV || 'development',
        isTesting: false,
        stagingHost:
          process.env.NODE_ENV !== 'production' &&
          !process.env.NUXT_PUBLIC_SITE_URL
            ? 'maev.si'
            : undefined,
      },
    },
  },
  sourcemap: true,
  typescript: {
    tsConfig: {
      vueCompilerOptions: {
        htmlAttributes: [], // https://github.com/johnsoncodehk/volar/issues/1970#issuecomment-1276994634
      },
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@headlessui/vue',
        '@tiptap/extension-link',
        '@tiptap/extension-text-align',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
        '@uppy/core',
        '@uppy/tus',
        '@vuelidate/core',
        'barcode-detector',
        'chart.js',
        'clipboardy',
        'css-element-queries',
        'downloadjs',
        'html-to-text',
        'isomorphic-dompurify',
        'js-confetti',
        'lodash-es',
        'mustache',
        'pretty-bytes',
        'prntr',
        'qrcode.vue',
        'slugify',
        'v-calendar',
        'vue-advanced-cropper',
        'vue-chartjs',
        'vue-qrcode-reader',
        'workbox-precaching',
      ],
    },
    plugins: [
      Components({
        dts: '.nuxt/components-icons.d.ts',
        resolvers: [IconsResolver()],
      }),
      Icons({
        scale: 1.5,
      }),
    ],
  },
  ...modulesConfig,
  ...environmentsConfig,
})
