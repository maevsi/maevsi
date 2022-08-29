import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

export const STACK_DOMAIN =
  process.env.NUXT_ENV_STACK_DOMAIN || 'localhost:3000'
export const BASE_URL =
  (process.env.NUXT_ENV_STACK_DOMAIN === undefined ? 'http' : 'https') +
  '://' +
  STACK_DOMAIN

export const LOCALES: LocaleObject[] = [
  {
    code: 'en',
    name: 'English',
    iso: 'en', // Will be used as catchall locale by default.
  },
  {
    code: 'de',
    name: 'Deutsch',
    iso: 'de',
  },
]
export const SITEMAP_EXCLUSIONS = ['/%F0%9F%AB%96']
export const SITEMAP_EXCLUSIONS_LOCALIZED: string[] = []

export const ITEMS_PER_PAGE = 8
export const ITEMS_PER_PAGE_LARGE = 100
export const JWT_NAME = '__Secure-jwt'
