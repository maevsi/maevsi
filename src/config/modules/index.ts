import type { DefineNuxtConfig } from 'nuxt/config'

import { RELEASE_NAME, SITE_URL } from '../../node'
import { SITE_NAME } from '../../shared/utils/constants'
import { cookieControlConfig } from './cookieControl'
import { i18nConfig } from './i18n'
import { pwaConfig } from './pwa'
import { securityConfig } from './security'

const ROBOTS_DISALLOW = [
  '/%F0%9F%AB%96',
  '/account/password/reset',
  '/account/verify',
  '/session/edit',
  '/session/view',
]

export const modulesConfig: ReturnType<DefineNuxtConfig> = {
  colorMode: {
    classSuffix: '',
  },
  ...cookieControlConfig,
  eslint: {
    config: {
      typescript: true,
    },
  },
  gtag: {
    config: {
      cookie_flags: 'samesite=strict',
    },
    id: 'G-WMQ1JY99XH',
    initCommands: [
      [
        'consent',
        'default',
        {
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          ad_storage: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500,
        },
      ],
    ],
    initMode: 'manual',
  },
  htmlValidator: {
    failOnError: true,
    logLevel: 'warning',
  },
  ...i18nConfig,
  ...pwaConfig,
  turnstile: {
    secretKeyPath: process.env.NUXT_PUBLIC_SITE_URL
      ? `/run/secrets/${SITE_NAME}_turnstile-key`
      : undefined,
  },
  linkChecker: {
    failOnError: true,
  },
  robots: {
    disallow: ROBOTS_DISALLOW,
  },
  ...securityConfig,
  sentry: {
    sourceMapsUploadOptions: {
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'maevsi',
      project: 'nuxt',
      telemetry: false,
    },
    unstable_sentryBundlerPluginOptions: {
      release: {
        name: await RELEASE_NAME(),
      },
    },
  },
  site: {
    url: SITE_URL,
  },
  sitemap: {
    credits: false,
    exclude: ROBOTS_DISALLOW,
  },
}
