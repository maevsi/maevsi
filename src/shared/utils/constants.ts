import { DEFAULTS } from '@dargmuesli/nuxt-cookie-control/runtime/types'

export const SITE_NAME = 'maevsi'
export const SITE_URL =
  process.env.SITE_URL ||
  process.env.NUXT_PUBLIC_SITE_URL ||
  (process.env.HOST ? 'https' : 'http') +
    '://' +
    (process.env.HOST ||
      `${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}`)

export const CACHE_VERSION = '2EvuFKRRxT'
export const COOKIE_CONTROL_CONSENT_COOKIE_NAME =
  DEFAULTS.cookieNameIsConsentGiven
export const GTAG_COOKIE_ID = 'ga'
export const IS_NITRO_OPENAPI_ENABLED =
  !!process.env.NUXT_IS_NITRO_OPENAPI_ENABLED || false
export const ITEMS_PER_PAGE = 10
export const ITEMS_PER_PAGE_LARGE = 100
export const JWT_ALGORITHM = 'RS256'
export const JWT_NAME = () =>
  `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}jwt`
export type LOCALE_CODES = 'de' | 'en'
export const LOCALES = [
  {
    code: 'de',
    file: 'de.json',
    language: 'de',
    name: 'Deutsch',
  },
  {
    code: 'en',
    file: 'en.json',
    language: 'en', // Will be used as catchall locale by default.
    name: 'English',
  },
]
export const POLYFILLS = ['Promise', 'requestAnimationFrame']
export const POSTGRES_INTEGER_MAXIMUM = Math.pow(2, 31) - 1
export const REGEX_PHONE_NUMBER = /^\+(?:[0-9] ?){6,14}[0-9]$/
export const REGEX_SLUG = /^[-A-Za-z0-9]+$/
export const REGEX_UPPERCASE_NONE = /^[^A-Z]+$/
export const REGEX_URL_HTTPS = /^https:\/\//
export const REGEX_UUID =
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
export const STAGING_HOST = 'maev.si'
export const STATE_LOADING_IDS_NAME = 'loadingIds'
export const STYLE_DEFAULT_GRAY = 'zinc'
export const TESTING_COOKIE_NAME = 'maevsi_is-testing'
export const TIMEZONE_COOKIE_NAME = 'm_tz'
export const TITLE_TEMPLATE = ({
  siteName,
  title,
}: {
  siteName: string
  title?: string
}) => (title && title !== siteName ? `${title} · ${siteName}` : siteName)
export const TURNSTILE_HEADER_KEY = 'X-Turnstile-Key'
