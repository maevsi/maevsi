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
        strictTransportSecurity: false,
      },
      rateLimiter: false, // TODO: enable when nuxt-link-checker bundles requests (https://github.com/harlan-zw/nuxt-link-checker/issues/21)
    },
    site: {
      debug: true,
    },
  },
}
