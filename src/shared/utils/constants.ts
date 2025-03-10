import { DEFAULTS } from '@dargmuesli/nuxt-cookie-control/runtime/types'

export const SITE_NAME = 'vibetype'

export const CACHE_VERSION = 'qfu1GSvnRF'
export const COOKIE_CONTROL_CONSENT_COOKIE_NAME =
  DEFAULTS.cookieNameIsConsentGiven
export const GTAG_COOKIE_ID = 'ga'
export const ITEMS_PER_PAGE = 10
export const ITEMS_PER_PAGE_LARGE = 100
export const JWT_ALGORITHM = 'RS256'
export const JWT_NAME = ({ isHttps }: { isHttps?: boolean }) =>
  `${isHttps ? '__Secure-' : ''}jwt`
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
export const MAEVSI_EMAIL_LIMIT_24H = 150
export const NUXT_PUBLIC_SENTRY_HOST = 'o4507213726154752.ingest.de.sentry.io'
export const NUXT_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE = 1.0
export const NUXT_PUBLIC_SENTRY_PROJECT_ID = '4507213736837200'
export const NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY =
  '5e253cec6a72a9eea44531e7205016ba'
export const NUXT_PUBLIC_VIO_IS_TESTING = false
export const POLYFILLS = ['Promise', 'requestAnimationFrame']
export const POSTGRES_INTEGER_MAXIMUM = Math.pow(2, 31) - 1
export const PRODUCTION_HOST = 'maev.si'
export const REGEX_PHONE_NUMBER = /^\+(?:[0-9] ?){6,14}[0-9]$/
export const REGEX_SLUG = /^[-A-Za-z0-9]+$/
export const REGEX_UPPERCASE_NONE = /^[^A-Z]+$/
export const REGEX_URL_HTTPS = /^https:\/\//
export const REGEX_UUID =
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
export const STATE_LOADING_IDS_NAME = 'loadingIds'
export const TESTING_COOKIE_NAME = `${SITE_NAME}_is-testing`
export const THEME_COLOR = '#191911'
export const TIMEZONE_COOKIE_NAME = 'm_tz'
export const TITLE_TEMPLATE = ({
  siteName,
  title,
}: {
  siteName: string
  title?: string
}) => (title && title !== siteName ? `${title} · ${siteName}` : siteName)
export const TURNSTILE_HEADER_KEY = 'X-Turnstile-Key'
