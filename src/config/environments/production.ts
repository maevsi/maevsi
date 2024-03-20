import type { DefineNuxtConfig } from 'nuxt/config'

export const productionConfig: ReturnType<DefineNuxtConfig> = {
  $production: {
    runtimeConfig: {
      public: {
        vio: {
          isInProduction: true,
        },
      },
    },

    // modules
    security: {
      headers: {
        strictTransportSecurity: {
          maxAge: 31536000,
          includeSubdomains: true,
          preload: true,
        },
      },
      rateLimiter: false, // TODO: enable the below when runtime configuration is supported (https://github.com/Baroshem/nuxt-security/pull/233/files)
      // ...(process.env.NUXT_PUBLIC_VIO_IS_TESTING === 'true'
      //   ? { rateLimiter: false }
      //   : {}),
    },
  },
}
