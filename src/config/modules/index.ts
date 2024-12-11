import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefineNuxtConfig } from 'nuxt/config'

import { SITE_NAME, SITE_URL } from '../../shared/utils/constants'
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
const currentDir = dirname(fileURLToPath(import.meta.url))

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
      ? '/run/secrets/maevsi_turnstile-key'
      : undefined,
  },
  linkChecker: {
    failOnError: true,
  },
  robots: {
    disallow: ROBOTS_DISALLOW,
  },
  ...securityConfig,
  site: {
    name: SITE_NAME,
    url: SITE_URL,
  },
  sitemap: {
    credits: false,
    exclude: ROBOTS_DISALLOW,
  },
  tailwindcss: {
    cssPath: join(currentDir, '../../app/assets/css/tailwind.css'),
  },
}
