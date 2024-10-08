import type { DefineNuxtConfig } from 'nuxt/config'

export const developmentConfig: ReturnType<DefineNuxtConfig> = {
  $development: {
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
