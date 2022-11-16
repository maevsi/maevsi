import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

export const CYPRESS_BASE_URL = 'https://localhost:3000'
export const ITEMS_PER_PAGE = 8
export const ITEMS_PER_PAGE_LARGE = 100
export const JWT_ALGORITHM = 'RS256'
export const JWT_NAME = '__Secure-jwt'
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
export const REGEX_PHONE_NUMBER =
  /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
export const REGEX_SLUG = /^[-A-Za-z0-9]+$/
export const REGEX_UPPERCASE_NONE = /^[^A-Z]+$/
export const REGEX_URL_HTTPS = /^https:\/\//
export const REGEX_UUID =
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
export const SITEMAP_EXCLUSIONS = ['/%F0%9F%AB%96']
export const SITEMAP_EXCLUSIONS_LOCALIZED: string[] = []
export const STAGING_HOST =
  process.env.NODE_ENV !== 'production' && !process.env.NUXT_PUBLIC_STACK_DOMAIN
    ? 'maev.si'
    : undefined
