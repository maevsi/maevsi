import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefineNuxtConfig } from 'nuxt/config'

import { SITE_NAME, SITE_URL } from '../../utils/constants'
import { cookieControlConfig } from './cookieControl'
import { i18nConfig } from './i18n'
import { pwaConfig } from './pwa'
import { securityConfig } from './security'

import type { LocaleRoutePathSchema } from '@typed-router/__paths'

const ROBOTS_DISALLOW = [
  '/%F0%9F%AB%96',
  '/account/password/reset',
  '/account/verify',
  '/session/edit',
  '/session/view',
] as LocaleRoutePathSchema[]
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
    enabled: false,
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
  seo: {
    splash: false,
  },
  site: {
    name: SITE_NAME,
    url: SITE_URL,
  },
  sitemap: {
    credits: false,
    exclude: ROBOTS_DISALLOW,
  },
  tailwindcss: {
    cssPath: join(currentDir, '../../assets/css/tailwind.css'),
  },
}
