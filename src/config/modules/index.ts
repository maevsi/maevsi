import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefineNuxtConfig } from 'nuxt/config'

import { LOCALES, SITE_NAME, SITE_URL } from '../../utils/constants'
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
  htmlValidator: {
    failOnError: true,
    logLevel: 'warning',
  },
  ...i18nConfig,
  i18n: {
    defaultLocale: 'en', // Must be set for the default prefix_except_default prefix strategy.
    detectBrowserLanguage: false,
    langDir: 'locales',
    lazy: true,
    locales: LOCALES,
  },
  ...pwaConfig,
  turnstile: {
    secretKeyPath: process.env.NUXT_PUBLIC_SITE_URL
      ? '/run/secrets/maevsi_turnstile-key'
      : undefined,
  },
  linkChecker: {
    enabled: false,
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
