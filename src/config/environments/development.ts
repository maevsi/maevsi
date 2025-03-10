import type { DefineNuxtConfig } from 'nuxt/config'

import { SITE_NAME } from '../../shared/utils/constants'

export const developmentConfig: ReturnType<DefineNuxtConfig> = {
  $development: {
    build: {
      transpile: ['import-in-the-middle', 'semver'],
    },
    ...(process.env.NUXT_PUBLIC_SITE_URL // TODO: make more readable, find better naming ("enable https only in standalone mode, not when running inside the stack")
      ? {}
      : {
          devServer: {
            https: {
              key: './.config/certificates/ssl.key',
              cert: './.config/certificates/ssl.crt',
            },
          },
        }),
    devtools: {
      enabled: !process.env.NUXT_PUBLIC_VIO_IS_TESTING,
    },
    runtimeConfig: {
      public: {
        vio: {
          isInProduction: false,
        },
      },
    },
    vite: {
      server: {
        allowedHosts: [SITE_NAME],
      },
    },

    // modules
    gtag: {
      enabled: false,
    },
    security: {
      headers: {
        crossOriginEmbedderPolicy: 'unsafe-none', // TODO: remove (https://github.com/Baroshem/nuxt-security/pull/531)
        strictTransportSecurity: false, // prevent endless reload in Chrome
      },
    },
    site: {
      debug: true,
    },
  },
}
