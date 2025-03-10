import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defu } from 'defu'
import type { Nuxt, ModuleOptions } from 'nuxt/schema'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'

import { modulesConfig } from '../config/modules'
import { environmentsConfig } from '../config/environments'
import {
  iconCollectionOptimization,
  IS_NITRO_OPENAPI_ENABLED,
  NUXT_PUBLIC_VIO_ENVIRONMENT,
  RELEASE_NAME,
  SITE_URL,
} from '../node'
import {
  NUXT_PUBLIC_SENTRY_HOST,
  NUXT_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE,
  NUXT_PUBLIC_SENTRY_PROJECT_ID,
  NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY,
  NUXT_PUBLIC_VIO_IS_TESTING,
  SITE_NAME,
} from '../shared/utils/constants'
import { GET_CSP } from '../server/utils/constants'

// TODO: let this error in "eslint (compat/compat)"" (https://github.com/DefinitelyTyped/DefinitelyTyped/issues/55519)
// setImmediate(() => {})

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en', // fallback data to prevent invalid html at generation
      },
      title: SITE_NAME,
    },
  },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/maevsi.css'],
  experimental: {
    typedPages: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@dargmuesli/nuxt-cookie-control',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/color-mode',
    '@nuxtjs/html-validator',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxtjs/turnstile',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-gtag',
    'shadcn-nuxt',
    async (_options: ModuleOptions, nuxt: Nuxt) => {
      nuxt.options.runtimeConfig.public.vio.releaseName = await RELEASE_NAME()
    },
    // nuxt-security: remove invalid `'none'`s and duplicates
    (_options: ModuleOptions, nuxt: Nuxt) => {
      const nuxtConfigSecurityHeaders = nuxt.options.security.headers

      if (
        typeof nuxtConfigSecurityHeaders !== 'boolean' &&
        nuxtConfigSecurityHeaders.contentSecurityPolicy
      ) {
        if (nuxt.options._generate) {
          nuxtConfigSecurityHeaders.contentSecurityPolicy = defu(
            {
              'script-src-elem': [
                "'unsafe-inline'", // nuxt-color-mode (https://github.com/nuxt-modules/color-mode/issues/266), runtimeConfig (static)
              ],
            },
            GET_CSP({ siteUrl: new URL(SITE_URL) }),
            nuxtConfigSecurityHeaders.contentSecurityPolicy,
          )
        }

        const csp = nuxtConfigSecurityHeaders.contentSecurityPolicy

        for (const [key, value] of Object.entries(csp)) {
          if (!Array.isArray(value)) continue

          const valueFiltered = value.filter((x) => x !== "'none'")

          if (valueFiltered.length) {
            ;(csp as Record<string, unknown>)[key] = [...new Set(valueFiltered)]
          }
        }
      }
    },
    'nuxt-security',
  ],
  shadcn: {
    prefix: '',
    componentDir: 'app/components/scn',
  },
  nitro: {
    compressPublicAssets: true,
    experimental: {
      asyncContext: true,
      openAPI: IS_NITRO_OPENAPI_ENABLED,
    },
    rollupConfig: {
      output: {
        sourcemap: true, // TODO: remove? (https://github.com/getsentry/sentry-javascript/discussions/15028)
      },
      // @ts-expect-error deep type instantiation (https://github.com/vitejs/vite-plugin-vue/issues/422)
      plugins: [vue()],
    },
  },
  routeRules: {
    '/**': {
      headers: { 'Document-Policy': 'js-profiling' }, // Sentry's browser profiling (currently supported for Chromium-based browsers)
    },
    '/api/auth-proxy': {
      security: {
        xssValidator: false, // TipTap's HTML is stored unescaped (is escaped when displayed) so api requests would trigger the xss protection on forward authentication (https://github.com/maevsi/maevsi/issues/1603)
      },
    },
    '/api/ical': {
      security: {
        xssValidator: false, // TipTap's HTML is stored unescaped (is escaped when displayed) so api requests would trigger the xss protection here (https://github.com/maevsi/maevsi/issues/1603)
      },
    },
    '/event/view/**': {
      security: {
        headers: {
          permissionsPolicy: {
            camera: ['self'],
          },
        },
      },
    },
  },
  runtimeConfig: {
    private: {
      api: {
        notification: {
          secret: '',
        },
      },
      openai: {
        apiKey: '',
      },
    },
    public: {
      i18n: {
        baseUrl: SITE_URL,
      },
      maevsi: {
        email: {
          limit24h: '150',
        },
      },
      sentry: {
        host: NUXT_PUBLIC_SENTRY_HOST,
        profiles: {
          sampleRate: NUXT_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE,
        },
        project: {
          id: NUXT_PUBLIC_SENTRY_PROJECT_ID,
          publicKey: NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY,
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
      security: {
        isRateLimiterDisabled: true, // TODO: disable once api requests are optimized (https://github.com/maevsi/maevsi/issues/1654)
      },
      site: {
        url: SITE_URL,
      },
      turnstile: {
        siteKey: '0x4AAAAAAABtEW1Hc8mcgWcZ',
      },
      vio: {
        auth: {
          jwt: {
            publicKey: '',
          },
        },
        environment: NUXT_PUBLIC_VIO_ENVIRONMENT, // || 'development'
        isTesting: NUXT_PUBLIC_VIO_IS_TESTING,
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
        '@sentry/nuxt',
        '@tiptap/extension-link',
        '@tiptap/extension-text-align',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
        '@uppy/core',
        '@uppy/tus',
        '@vuelidate/core',
        '@vueuse/core',
        'chart.js',
        'clipboardy',
        'clsx',
        'css-element-queries',
        'downloadjs',
        'firebase/app',
        'firebase/messaging',
        'firebase/messaging/sw',
        'html-to-text',
        'isomorphic-dompurify',
        'js-confetti',
        'lodash-es',
        'mustache',
        'pretty-bytes',
        'prntr',
        'qrcode.vue',
        'seedrandom',
        'slugify',
        'tailwind-merge',
        'v-calendar',
        'vue-advanced-cropper',
        'vue-chartjs',
        'vue-qrcode-reader',
        'workbox-precaching',
      ],
    },
    plugins: [
      Components({
        dts: '../.nuxt/components-icons.d.ts',
        resolvers: [
          IconsResolver({ customCollections: ['maevsi', 'maevsi-colored'] }),
        ],
      }),
      Icons({
        customCollections: {
          maevsi: iconCollectionOptimization({}),
          'maevsi-colored': iconCollectionOptimization({
            isColored: true,
          }),
        },
        scale: 1.5,
      }),
      tailwindcss(),
    ],
  },
  ...modulesConfig,
  ...environmentsConfig,
})
