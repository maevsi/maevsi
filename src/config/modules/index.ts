import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefineNuxtConfig } from 'nuxt/config'

import { LOCALES, SITE_NAME, SITE_URL } from '../../utils/constants'

import { cookieControlConfig } from './cookieControl'
import { pwaConfig } from './pwa'
import { securityConfig } from './security'

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
    exclude: LOCALES.map(
      (locale) =>
        `/${locale.code !== 'en' ? `${locale.code}/` : ''}%F0%9F%AB%96`,
    ),
  },
  tailwindcss: {
    cssPath: join(currentDir, '../../assets/css/tailwind.css'),
  },
}
